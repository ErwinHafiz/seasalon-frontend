import GlobalApi from "@/app/_utils/GlobalApi"
import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

function ServiceSugestion() {
  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    getServiceList()
  }, [])

  const getServiceList = () => {
    GlobalApi.getServiceList().then((resp) => {
      console.log(resp)
      setServiceList(resp.data.data)
    })
  }
  return (
    <>
      <div className="p-4 border-[1px] mt-5 md:ml-5">
        <h2 className="mb-3 font-bold">Sugestion</h2>

        {serviceList.map((service, i) => (
          <div className="mb-4 p-3 shadow-sm w-full cursor-pointer hover:bg-slate-100 rounded-lg  items-center gap-3 ">
            <Link href={"/details/" + service.id}>
              <Image
                src={service.attributes?.image?.data?.attributes?.url}
                width={400}
                height={400}
                className="w-full h-[150px] rounded-md"
              />

              <div className="  flex flex-col items-start gap-1 mt-2">
                <h2 className="flex  font-bold text-[10px] bg-slate-50">
                  {service.attributes?.name}
                </h2>
                <h2 className="flex gap-2 p-2 text-slate-800 text-md">
                  <Clock className="w-[20px] h-[20px] " />
                  <span className="text-[10px]">
                    {service.attributes.duration}
                  </span>
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default ServiceSugestion
