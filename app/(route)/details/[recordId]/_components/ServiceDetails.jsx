"use client"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Image from "next/image"
import React from "react"
import { useRouter } from "next/navigation"
import Reservation from "./Reservation"
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import FormAllReservation from "@/app/_components/FormAllReservation"

function ServiceDetails({ service }) {
  const { user } = useKindeBrowserClient()
  const router = useRouter()

  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-3 border-[1px] p-5 mt-5 bg-gradient-to-r from-rose-300 to-slate-50  ">
        {/* image */}
        <Image
          src={service.attributes?.image?.data?.attributes?.url}
          alt="service"
          width={400}
          height={400}
          className="h-[200px] w-[95%] mx-auto object-cover rounded-lg"
        />
        {/* info */}
        <div className="col-span-2 mt-5 flex flex-col gap-3">
          <h2 className="font-bold text-2xl">{service.attributes?.name}</h2>
          <h2 className="flex gap-2 p-2 text-slate-800 text-md">
            <Clock /> <span> {service.attributes.duration}</span>{" "}
            <span className="text-slate-500">minutes</span>
          </h2>

          {user ? (
            <FormAllReservation />
          ) : (
            <LoginLink>
              {" "}
              <Button className="flex flex-row mt-2 justify-center bg-transparent items-center border-neutral-900 border-[1px] text-slate-950 hover:text-slate-50 from-neutral-50">
                Reservation Now
              </Button>
            </LoginLink>
          )}
        </div>
      </div>
      <div className="p-3 border-[1px] rounded-lg mt-4">
        <h2 className="font-semibold text-md">
          Why you should reservation with us?
        </h2>
        <p className="text-gray-500 tracking-wide">
          Experience Exceptional Beauty and Wellness Services! Expert
          Professionals: Our highly trained team delivers top-notch hair, skin,
          and nail services. Personalized Care: We tailor each service to your
          unique needs and preferences. Premium Products: We use only the best
          products to enhance your natural beauty. Relaxing Atmosphere: Enjoy a
          serene and tranquil environment. Attention to Detail: We ensure
          perfection in every service we provide. Innovative Techniques: We stay
          updated with the latest beauty trends and techniques. Outstanding
          Customer Service: Your satisfaction is our priority from start to
          finish. Book with us today and discover the difference that expert
          care and a luxurious experience can make!
        </p>
      </div>
      <div className="mt-4">
        <Button onClick={() => router.push("/")}>Go to Home</Button>
      </div>
    </>
  )
}

export default ServiceDetails
