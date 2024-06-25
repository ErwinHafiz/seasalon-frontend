"use client"
import React, { useState, useEffect } from "react"
import GlobalApi from "../_utils/GlobalApi"
import Image from "next/image"
import { Section } from "lucide-react"

function ServiceList() {
  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    getServiceList()
  }, [])

  const getServiceList = async () => {
    try {
      console.log("Fetching data list ... ")
      const resp = await GlobalApi.getServiceList()
      console.log("Service Data:", resp.data.data)
      setServiceList(resp.data.data)
    } catch (e) {
      console.log("erorrnya ", e)
    }
  }

  return (
    <div className=" p-10 mb-2">
      <div className="justify-center items-center text-center mt-10 m-4 mx-auto ">
        <h1 className="font-fontGreat  text-4xl "> Our Services</h1>
        <p className="mt-3 text-[18px]">
          Our service always use profesional staff and use best tools for give
          nice and perfect services
        </p>
      </div>
      {/* service list  */}
      <div className=" grid gap-7 mt-8 m-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {serviceList.length > 0
          ? serviceList.map((service, i) => (
              <div
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm hover:scale-105 transition-all ease-in-out "
                key={i}
              >
                <div className="mt-2 items-center flex flex-col gap-2">
                  <h2 className="px-2 bg-pink-50 text-primary text-lg p-1 rounded-lg font-bold w-full items-center text-center">
                    {service.attributes?.name}
                  </h2>
                  <Image
                    src={service.attributes?.image?.data?.attributes?.url}
                    alt="service"
                    width={500}
                    height={600}
                    className="h-[300px] w-full object-cover rounded-lg"
                  />
                  <h2
                    className="p-2 px-3 border-[1px] text-primary rounded-full w-full text-center text-lg mt-2 cursor-pointer bg-blue-50
                hover:bg-primary hover:text-white 
                "
                  >
                    Book Now
                  </h2>
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
