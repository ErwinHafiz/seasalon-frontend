"use client"

import React, { useEffect, useState } from "react"
import ServiceDetails from "./_components/ServiceDetails"
import ServiceSugestion from "./_components/ServiceSugestion"
import GlobalApi from "@/app/_utils/GlobalApi"
import Image from "next/image"

function Details({ params }) {
  const [service, setService] = useState()
  const [serviceMore, setServiceMore] = useState([])

  useEffect(() => {
    getServiceById()
  }, [])
  const getServiceById = () => {
    GlobalApi.getServiceById(params.recordId).then((resp) => {
      setService(resp.data.data)
    })
  }
  // more :
  useEffect(() => {
    getServiceList()
  }, [])
  const getServiceList = () => {
    GlobalApi.getServiceList().then((respp) => {
      setServiceMore(respp.data)
    })
  }

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-2xl">Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Service Detail */}
        <div className="col-span-3">
          {service && <ServiceDetails service={service} />}
        </div>
        {/* Service recomendation */}
        <ServiceSugestion />
      </div>
    </div>
  )
}

export default Details
