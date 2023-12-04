import Button from "@/components/Button"
import Loader2 from "../assets/img/loader-2.svg"
import Navbar from "@/components/Navbar"
import Group from "../assets/img/Group.svg"

import dynamic from "next/dynamic"
import Hero from "@/components/Hero"
import NftList from "@/components/NftList"
import SocialLink from "@/components/SocialLink"
import HomeTable from "@/components/HomeTable"
import HomeFooter from "@/components/HomeFooter"

export default function Home() {
  return (
    <div className=" w-full h-auto">
      <div className=" backg">
        <Navbar />
        {/* Hero section =Home= */}
        <Hero />
        {/* List of nft */}
        {/* BuyTicket */}
        <NftList />
        {/* Table */}
        <HomeTable />
        {/* ClassLink */}
        <SocialLink />
        {/* Footer */}
        <HomeFooter />
      </div>
    </div>
  )
}
