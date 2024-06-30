"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import GlobalApi from "../_utils/GlobalApi"

function Contacts() {
  const [contactList, setContactList] = useState([])

  useEffect(() => {
    getContactList()
  }, [])

  const getContactList = async () => {
    try {
      const resp = await GlobalApi.getContactList()

      setContactList(resp.data.data)
    } catch (e) {
      console.log("erorrnya ", e)
    }
  }

  return (
    <div className="bg-gradient-to-r from-rose-300 to-slate-100  w-full h-fit">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center ">
        <div className="text-center mx-auto justify-center ">
          <h1 className="text-5xl m-2 mt-2 ">Contact & details</h1>
          <h2 className="text-sm m-2">
            Feel free to contact us for any inquiries or to book an appointment.
            We're always ready to help best for you
          </h2>
        </div>
        {contactList.length > 0
          ? contactList.map((contact, i) => (
              <div className=" align-middle justify-center">
                <div
                  className=" bg-transparent border-pink-950 border-[1px] gap-2 rounded-sm shadow-sm p-1  m-2   mt-2 "
                  key={i}
                >
                  <h1 className="text-lg font-bold mb-2 text-primary">
                    {contact.attributes?.name}
                  </h1>
                  <div className="flex items-center text-center">
                    <Image
                      src="/whatsapp.png"
                      width={25}
                      height={25}
                      alt="WhatsApp"
                    />
                    <h2 className="text-lg font-bold mb-2 text-slate-800 ml-4">
                      {contact.attributes?.phone}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : [1, 2].map((item, i) => (
              <div
                key={i}
                className="h-[80px]  bg-slate-300  gap-2 rounded-sm shadow-md p-1  m-2  mt-10animate-pulse flex items-center justify-center"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default Contacts
