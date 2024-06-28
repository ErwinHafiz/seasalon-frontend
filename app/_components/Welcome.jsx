"use client"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import FormAllReservation from "./FormAllReservation"
import Link from "next/link"
import GlobalApi from "../_utils/GlobalApi"

import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
function Welcome({ service }) {
  const [serviceList, setServiceList] = useState([])
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    console.log("uswwer", user)

    // console.log("permision", getPermission)
  }, [user])

  useEffect(() => {
    getServiceList()
  }, [])

  const getServiceList = async () => {
    try {
      const resp = await GlobalApi.getServiceList()
      setServiceList(resp.data.data)
    } catch (e) {
      console.log("error: ", e)
    }
  }

  return (
    <div className="bg-gradient-to-l from-rose-300 to-slate-100 w-screen max-h-full">
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16 h-screen w-full">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-96 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full mt-6 items-end">
              <img
                alt=""
                src="./bg.jpg"
                width={800}
                height={800}
                className="absolute inset-0 h-full w-full object-cover rounded-2xl mt-3 max-w-5xl"
              />
            </div>

            <div className="lg:py-24 ">
              <h1 className="text-3xl font-semibold sm:text-5xl ">
                Welcome to our sea salon website 👋
              </h1>
              <h2 className="text-primary text-3xl  mt-2 font-fontGreat">
                Beauty and elegance redefined{" "}
              </h2>
              <p className="mt-5 text-gray-600 ">
                We always raise your beauty and elegance back to shine
              </p>
              <div className=" mx-auto flex-col sm-grid-cols-1 grid-cols-2 w-full center ">
                <div>
                  {user ? (
                    <FormAllReservation />
                  ) : (
                    <LoginLink>
                      <Button className="flex flex-row mt-2 justify-center bg-transparent items-center border-neutral-900 border-[1px] text-slate-950 hover:text-slate-50 from-neutral-50">
                        Explore Now
                      </Button>
                    </LoginLink>
                  )}
                </div>

                {/* <Link href={"/reservation"}>
                <LoginLink>                  <Button className="flex flex-row mt-2 justify-center bg-transparent items-center border-neutral-900 border-[1px] text-slate-950 hover:text-slate-50 from-neutral-50">
                    Explore Now
                  </Button>
                  </LoginLink>

                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Welcome
