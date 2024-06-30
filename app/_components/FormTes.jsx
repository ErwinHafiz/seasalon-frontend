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

function FormTes() {
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    getServiceList_time()
  }, [])

  const getServiceList_time = () => {
    GlobalApi.getServiceTimes().then((resp) => {
      console.log("Service List time :", resp.data.data)
      setServices(resp.data.data)
    })
  }

  const updateServiceTimesStatus = (serviceTimes) => {
    setTimeSlot(
      serviceTimes.map((timeSlot) => ({
        ...timeSlot,
        booked: timeSlot.attributes.status,
      }))
    )
  }

  const isPastDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return day < today
  }

  const handleServiceChange = (serviceId) => {
    const selected = services.find((item) => item.id === serviceId)
    setSelectedService(selected)
    const serviceTimes = selected.attributes.service_times.data
    updateServiceTimesStatus(serviceTimes)
  }

  const saveReservation = () => {
    if (selectedTimeSlot && !selectedTimeSlot.booked) {
      const formattedDate = date.toISOString().split("T")[0]
      const selectedTime = selectedTimeSlot.attributes.time

      GlobalApi.getReservationsByServiceAndTime(
        selectedService.id,
        formattedDate,
        selectedTime
      )
        .then((resp) => {
          if (resp.data.data.length === 0) {
            const data = {
              data: {
                name: user.given_name + " " + user.family_name,
                phone: phone,
                service: selectedService.id,
                date: formattedDate,
                time: selectedTime,
                user_id: user.id,
              },
            }
            GlobalApi.postReservation(data)
              .then((resp) => {
                if (resp) {
                  setTimeSlot((prevTimes) =>
                    prevTimes.map((prevTime) =>
                      prevTime.id === selectedTimeSlot.id
                        ? { ...prevTime, booked: true }
                        : prevTime
                    )
                  )
                  toast("Success reservation")
                }
              })
              .catch((error) => {
                console.error("Error posting booking:", error)
                toast.error("Failed to make reservation")
              })
          } else {
            toast.error("Selected time slot is already booked")
          }
        })
        .catch((error) => {
          console.error("Error checking reservations:", error)
          toast.error("Error checking reservations")
        })
    } else {
      toast.error("Selected time slot is already booked")
    }
  }

  return (
    <>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex flex-row mt-2 justify-center bg-transparent items-center border-neutral-900 border-[1px] text-slate-950 hover:text-slate-50">
            Reservation Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-3xl text-left">
              Pick Your Reservation
            </DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:w-full mt-3">
                <div className="justify-center mr-2 md:mt-5 md:justify-center font-semibold text-black text-sm rounded-md">
                  <div className="mt-2 ml-8">
                    <div className="grid grid-cols-3">
                      <div>Name</div>
                      <div className="col-span-2 w-[90%]">
                        <Input
                          className="border-[1px] rounded-sm shadow-sm"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <hr />
                    </div>
                    <div className="grid grid-cols-3">
                      <div>Phone Number</div>
                      <div className="col-span-2 w-[90%]">
                        <Input
                          className="border-[1px]"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <hr />
                    </div>
                    <div className="grid grid-cols-3">
                      <div>Type of Service</div>
                      <div className="col-span-2 w-[90%]">
                        <Select onValueChange={handleServiceChange}>
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
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="font-bold text-black">
                  <h2 className="mb-1 text-sm">Select Date</h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border shadow-sm mx-auto bg-slate-100"
                  />
                  <div className="mt-3">
                    <h2>Select Time</h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-3 overflow-y-auto max-h-[200px]">
                      {timeSlot.map((item, i) => (
                        <h2
                          key={i}
                          onClick={() =>
                            !item.booked && setSelectedTimeSlot(item)
                          }
                          className={`p-2 border cursor-pointer rounded-full text-center ${
                            item.attributes.time ===
                            selectedTimeSlot?.attributes.time
                              ? "bg-primary text-white"
                              : ""
                          } ${
                            item.booked
                              ? "bg-slate-300 text-gray-500 cursor-not-allowed"
                              : "hover:bg-primary hover:text-white"
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

export default FormTes
