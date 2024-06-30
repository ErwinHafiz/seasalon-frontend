import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import moment from "moment/moment"
import Image from "next/image"
import React from "react"

function ReservationList({ reservationList }) {
  return (
    <div>
      <div>
        {reservationList &&
          reservationList.map((reservation, i) => (
            <div
              key={reservation.id}
              className="flex gap-4  p-5 border items-center m-3 rounded-lg"
            >
              <Image
                src={
                  reservation.attributes.service.data.attributes.image.data
                    .attributes.url
                }
                alt={reservation.attributes.service.data.attributes.name}
                width={100}
                height={100}
                className="h-[70px]  w-[70px] object-cover rounded-full"
              />
              <div className="flex flex-col gap-2 mb-2 p-1 w-full">
                <h2 className="flex gap-2">
                  {reservation.attributes.service.data.attributes.name}
                </h2>
                <h2 className="flex gap-2">
                  {reservation.attributes.service.data.attributes.duration}{" "}
                  <span> Minutes</span>
                </h2>
                <h2 className="flex gap-2">
                  Reservation on:
                  <span>
                    {" "}
                    {moment(reservation.attributes.date).format("DD/MMM/YYYY")}
                  </span>
                </h2>
                <h2 className="flex gap-2">
                  <Clock /> At time: <span>{reservation.attributes.time}</span>
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ReservationList
