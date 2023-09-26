import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import React, { useMemo, useState } from "react"

import Spinner from "@/components/chanceRoom/Spinner"
import Table from "../../../assets/img/home/table.svg"
import Settel from "../../../assets/img/home/sett.svg"
import Ticket from "@/../public/home/ticket.svg"
import Menu from "@/../public/home/align-left.svg"

import Address from "@/components/ui/Address"
//@ts-ignore
import Identicon from "react-identicons"
import Indentic from "@/components/chanceRoom/Indentic"
import ChanseRoomName from "@/components/chanceRoom/ChanseRoomName"
import { Drawer } from "@mui/material"
import LeftMenu from "@/components/chanceRoom/LeftMenu"
import Sound from "@/components/chanceRoom/Sound"
import Winner from "@/components/chanceRoom/Winner"
import { useContractEvent } from "wagmi"
import { secondAbi1Bd } from "@/assets/abis/mainAbis"
import { VrFABI } from "@/assets/abis/smap"

type lotteryProps = {
  params: {
    slug: `0x${string}`
  }
}

const page = ({ params: { slug } }: lotteryProps) => {
  return (
    <div className="w-full h-screen relative overflow-hidden ">
      <div className="w-full bg-[#B1C5FB] absolute z-0 h-screen " />
      <div className="backlottery  absolute w-full z-10 h-screen top-0 right-0 bottom-0 left-0">
        {/* Nav */}
        <nav className="flex justify-between w-full xl:pt-8 pt-2 h-[25%]">
          <div className="lg:hidden flex flex-col gap-y-4  mix-w-[900px]:w-[10rem] pl-3 lg:pl-0">
            <LeftMenu />
          </div>
          <div className="lg:flex hidden flex-col gap-y-2 justify-center items-center mix-w-[900px]:w-[11rem]">
            <Button fontW="text-[20px]" scale="1" styless="mb-2">
              <a href={`/Ticket/${slug}`} className="w-full h-[65px] pt-2">
                Mint more ticket
              </a>
            </Button>
            <Sound />
            <Button styless="" scale="0.8">
              <Link href={"/"} className="w-full h-[60px] pt-1">
                BACK
              </Link>
            </Button>
          </div>
          <ChanseRoomName contractAddress={slug} />
          <div className="flex gap-x-2">
            <div className="2xl:block hidden">
              <Image src={"/eyes.png"} className=" mr-2" width={90} height={50} alt="Eyes" />
            </div>
            <div className="xl:pr-0 pr-3">
              <Indentic randString={slug} />

              {/* <Image src={"/acc.png"} className="pt-" width={50} height={50} alt="acc" /> */}
            </div>
            <div className="w-full pt-1 h-[24%] xl:flex hidden justify-center items-center ">
              <Address />
            </div>
          </div>
        </nav>

        <div className="w-full flex h-[75%]">
          <div className="flex-col w-[27%] justify-end pl-14 xl:flex hidden">
            <div className="relative xl:flex hidden h-[40%] flex-col justify-end">
              <div className="absolute -top-2">
                <Image src={"/frog.png"} width={150} className="" height={150} alt="frog" />
              </div>
              <Table className="" />
            </div>
          </div>
          <Spinner contractAddress={slug} />
          {/* <button onClick={logg}>clogg</button> */}
          <Winner />
        </div>
      </div>
    </div>
  )
}

export default page
