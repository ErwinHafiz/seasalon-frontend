"use client"
import React, { useState, useEffect } from "react"
import GlobalApi from "../_utils/GlobalApi"
import Image from "next/image"
import Link from "next/link"

function ServiceList() {
  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    getServiceList()
  }, [])

  const getServiceList = async () => {
    try {
      const resp = await GlobalApi.getServiceList()
      setServiceList(resp.data.data)
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  return (
    <div className=" mt-50 md:mt-5">
      <div className="justify-center items-center text-center mt-10 m-4 mx-auto">
        <h1 className="font-fontGreat text-4xl">Our Services</h1>
        <p className="mt-3 text-[18px]">
          Our service always uses professional staff and the best tools to
          provide excellent services.
        </p>
      </div>
      {/* Service list */}
      <div className="grid gap-7 mt-8 m-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {serviceList.length > 0
          ? serviceList.map((service, i) => (
              <div
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm hover:scale-105 transition-all ease-in-out"
                key={i}
              >
                <div className="mt-2 items-center flex flex-col gap-2">
                  <h2 className="px-2 bg-transparent text-primary text-lg p-1 rounded-lg font-bold w-full items-center text-center">
                    {service.attributes?.name}
                  </h2>
                  <Link href={`/details/` + service.id}>
                    <Image
                      src={service.attributes?.image?.data?.attributes?.url}
                      alt="service"
                      width={500}
                      height={600}
                      className="h-[300px] w-full object-cover rounded-lg"
                    />
                    <h2 className="p-2 px-3 border-[1px] text-slate-800 rounded-md w-full text-center text-lg mt-2 cursor-pointer bg-transparent hover:bg-primary hover:text-white">
                      See details
                    </h2>
                  </Link>
                </div>
              </div>
            ))
          : [1, 2, 3].map((item, i) => (
              <div
                className="h-[220px] bg-slate-300 w-full rounded-lg animate-pulse flex items-center justify-center"
                key={i}
              ></div>
            ))}
      </div>
    </div>
  )
}

export default ServiceList
