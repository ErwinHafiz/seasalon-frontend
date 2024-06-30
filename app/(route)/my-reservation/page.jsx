"use client"
import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationList from "./_components/ReservationList"
import GlobalApi from "@/app/_utils/GlobalApi"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { Type } from "lucide-react"

function my_reservation() {
  const { user } = useKindeBrowserClient()
  const [reservationList, setReservationList] = useState([])

  useEffect(() => {
    user && getUserReservationList()
  }, [user])

  const getUserReservationList = () => {
    GlobalApi.getUserReservation(user?.id).then((resp) => {
      console.log(resp.data.data)
      setReservationList(resp.data.data)
    })
  }
  /**
   *
   * @param {} type
   * @returns
   */

  const filterUserReservation = (type) => {
    const result = reservationList.filter((item) =>
      type == "upcoming"
        ? new Date(item.attributes.date) >= new Date()
        : new Date(item.attributes.date) <= new Date()
    )
    console.log(result)
    return result
  }

  return (
    <div>
      <div className="px-2 sm:px-10">
        <h2 className="font-bold text-2xl">My reservation</h2>
        <Tabs defaultValue="upcoming" className="w-full ">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Exipired</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <ReservationList
              reservationList={filterUserReservation("upcoming")}
            />
          </TabsContent>
          <TabsContent value="expired">
            <ReservationList
              reservationList={filterUserReservation("expired")}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default my_reservation
