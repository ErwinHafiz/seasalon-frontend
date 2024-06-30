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
  const { user, permissions } = useKindeBrowserClient()

  useEffect(() => {
    console.log("user", user)
    console.log("permission", permissions)
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
      path: "/#services",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/#contacts",
    },
  ]

  const handleScroll = (event, path) => {
    event.preventDefault()
    const targetId = path.split("#")[1]
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex items-center justify-between p-4 shadow-sm bg-gradient-to-l from-slate-100 to-neutral-100 w-screen mx-auto ">
      <div className="flex items-center gap-10">
        <Image
          src="/Logo.png"
          alt="logo"
          width={180}
          height={80}
          className="ml-8"
        />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, i) => (
            <li
              key={i}
              className="to-blue-500hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              {item.path.startsWith("/") ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <a href={item.path} onClick={(e) => handleScroll(e, item.path)}>
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger className="">
            <ul className="flex border-[1px] rounded-md border-separate transition-all ease-in-out gap-2 hover:bg-pink-600 hover:text-slate-900 border-slate-800 hover:border-[2px]">
              <li className="">{user.given_name} </li>
              <li className="font-light text-slate-800 cursor-default">
                as {permissions.permissions[0]}{" "}
              </li>
            </ul>
          </PopoverTrigger>

          <PopoverContent className="w-44">
            <ul>
              <Link
                href="/my-reservation"
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              >
                My Reservation
              </Link>
              <li className="hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                <LogoutLink>Log out</LogoutLink>
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
