"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { toast, Toaster } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import GlobalApi from "../_utils/GlobalApi"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

function FormAllReservation() {
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    getServiceList()
  }, [])

  const getServiceList = () => {
    GlobalApi.getServiceList().then((resp) => {
      console.log("Service List:", resp.data.data)
      setServices(resp.data.data)
      if (resp.data.data.length > 0) {
        setSelectedService(resp.data.data[0])
        setTimeSlot(resp.data.data[0].attributes.service_times.data)
      }
    })
  }

  const isPastDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) 
    return (
      day < today &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    )
  }
  const handleServiceChange = (serviceId) => {
    const selected = services.find((item) => item.id === serviceId)
    setSelectedService(selected)
    setTimeSlot(selected.attributes.service_times.data)
  }

  const saveReservation = () => {
    const data = {
      data: {
        name: user.given_name + " " + user.family_name,
        Phone: phone,
        service: selectedService.id,
        date: date.toISOString(),
        time: selectedTimeSlot,
        user_id: user.id,
      },
    }
    GlobalApi.postReservation(data)
      .then((resp) => {
        console.log(resp)
        if (resp) {
          toast("Success reservation")
        }
      })
      .catch((error) => {
        console.error("Error posting booking:", error)
        toast.error("Failed to make reservation")
      })
  }

  return (
    <>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-3 rounded-full md:w-1/2">
            Reservation Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pick Your Reservation</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:w-full">
                <div className="justify-start mr-2 md:mt-5 md:justify-center text-slate-90">
                  <tr>
                    <th>Name</th>
                    <td>
                      <Input
                        className="border-[1px] rounded-sm shadow-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label id="phone" className= "text-slate-90">Phone Number</label>
                    </td>
                    <td>
                      <Input
                        className="border-[1px]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      ></Input>
                    </td>
                  </tr>
                  <tr>
                    <td className= "text-slate-90">Type of Services</td>
                    <td>
                      <Select
                        className="bg-slate-600"
                        onValueChange={handleServiceChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.attributes.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                </div>
                <div className= "text-slate-90">
                  <h2 >Select Date</h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border shadow-sm mx-auto bg-slate-100"
                  />
                  <div className="mt-3 text-slate-90">
                    <h2>Select Time</h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-3 overflow-y-auto max-h-[200px]">
                      {timeSlot.map((item, i) => (
                        <h2
                          key={i}
                          onClick={() =>
                            setSelectedTimeSlot(item.attributes.time)
                          }
                          className={`p-2 border cursor-pointer rounded-full text-center hover:bg-primary hover:text-white ${
                            item.attributes.time === selectedTimeSlot &&
                            "bg-primary text-white"
                          }`}
                        >
                          {item.attributes.time}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  type="button"
                  disabled={!(date && selectedTimeSlot && name && phone)}
                  onClick={saveReservation}
                >
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FormAllReservation
