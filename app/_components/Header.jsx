"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"

import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    console.log("user", user)

    // console.log("permision", getPermission)
  }, [user])

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Our Services",
      path: "/",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ]

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image
          src="/Logo.png"
          alt="logo"
          width={180}
          height={80}
          className="ml-8"
        />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, i) => {
            return (
              <Link href={item.path} key={i}>
                <li
                  className=" to-blue-500hover:text-primary 
            cursor-pointer hover:scale-105 transition-all ease-in-out"
                >
                  {item.name}
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger className="">
            <ul className="flex  border-[1px] border-slate-600 rounded-md border-separate  transition-all ease-in-out gap-2  ">
              <li className=" cursor-default  ">{"user :"} </li>
              <li className=" hover:bg-pink-600 hover:text-slate-900  border-slate-800  hover:border-[2px] ">
                {user.given_name}
              </li>
            </ul>
          </PopoverTrigger>

          <PopoverContent className="w-44">
            <ul>
              <li className="hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                My Reservation
              </li>
              <li className="hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                <LogoutLink> Log out</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button>Get Started</Button>
        </LoginLink>
      )}
    </div>
  )
}

export default Header
