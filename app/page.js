import Image from "next/image"
import Welcome from "./_components/Welcome"
import ServiceList from "./_components/ServiceList"

import Contacts from "./_components/Contacts"
import Ratings from "./_components/Ratings"

export default function Home() {
  return (
    <>
      <div>
        <Welcome />
        <div id="services">
          <ServiceList />
        </div>
        <div id="contacts">
          <Contacts />
        </div>
        <Ratings />
      </div>
    </>
  )
}
