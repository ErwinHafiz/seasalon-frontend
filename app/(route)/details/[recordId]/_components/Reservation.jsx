"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

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
import GlobalApi from "@/app/_utils/GlobalApi"

function Reservation({ service }) {
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()

  useEffect(() => {
    getTime()
  }, [])
  console.log({ service })
  const getTime = () => {
    const timeList = []
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      })
      timeList.push({
        time: i + ":30 AM",
      })
    }

    setTimeSlot(timeList)
  }
  const isPastDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day
    return day < today
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
      <Dialog>
        <DialogTrigger className="">
          <Button className="mt-3 rounded-full md:w-1/2">
            Reservation Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pick Your Reservation</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:w-full">
                {/* name */}
                <div className="justify-start mr-2 md:mt-5  md:justify-center md: ">
                  <tr>
                    <th>{service.attributes?.name}</th>
                    <td>
                      <Input className="border-[1px] rounded-sm shadow-sm"></Input>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label>Phone Number</label>
                    </td>
                    <td>
                      <Input className=""></Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Type of Services </td>
                    <td>
                      <Select className="bg-slate-600">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={service.attributes?.name} />
                        </SelectTrigger>
                        <SelectContent value={service.attributes?.name}>
                          {service.attributes?.name}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                </div>
                <div className="">
                  <div className="">
                    <h2>Select Date</h2>
                    {/* calendar */}

                    <div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={isPastDay}
                        className="rounded-md border shadow-sm  mx-auto bg-slate-100"
                      />
                    </div>
                  </div>
                  {/* timeslot */}
                  <div className="mt-3">
                    <h2>Select clock</h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-3 overflow-y-auto max-h-[200px]">
                      {timeSlot?.map((item, i) => (
                        <h2
                          key={i}
                          onClick={() => setSelectedTimeSlot(item.time)}
                          className={`p-2 border  cursor-pointer rounded-full text-center hover:bg-primary hover:text-white ${
                            item.time == selectedTimeSlot &&
                            "bg-primary text-white"
                          }`}
                        >
                          {item.time}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" disabled={!(date && selectedTimeSlot)}>
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

export default Reservation
