"use client"
import React, { useEffect, useState } from "react"
import Header from "../_components/Header"
import FormAllReservation from "../_components/FormAllReservation"
import Footer from "../_components/Footer"
import Reservation from "../(route)/details/[recordId]/_components/Reservation"
import GlobalApi from "../_utils/GlobalApi"

function page() {
  const [service, setServiceList] = useState()
  useEffect(() => {
    getServiceList()
  }, [])

  const getServiceList = async () => {
    try {
      const resp = await GlobalApi.getServiceList()
      setServiceList(resp.data.data)
      // console.log(resp.data.data)
    } catch (e) {
      console.log("error: ", e)
    }
  }
  return (
    <>
      <div>{/* <Reservation /> */}</div>
    </>
  )
}

export default page
