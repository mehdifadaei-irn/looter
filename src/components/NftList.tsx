"use client"
import React, { useRef } from "react"
import Reveal from "./ui/Reveal"

import { useContractRead } from "wagmi"

import { useConnectModal } from "@rainbow-me/rainbowkit"
import HomeChanceRoomItem from "./HomeChanceRoomItem"

import { FactoryAbi } from "@/assets/abis/mainAbis"
import { useScroll, useTransform, motion } from "framer-motion"
import { ChervRight } from "./Icons"

export interface SimpleDialogProps {
  open: boolean
  selectedValue?: string
  onClose: any
  modalContent?: any
}

const NftList = () => {
  const [open, setOpen] = React.useState(false)
  const [modalContent, setModalContent] = React.useState<any>({})

  const handleClickOpen = (nft: any) => {
    setModalContent(nft)
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setModalContent({})
    // setSelectedValue(value)
  }

  const { data, isError, isLoading } = useContractRead({
    address: "0x000004911bedE2053923bAF3b59e1a9f034482C9",
    abi: FactoryAbi,
    functionName: "chanceRooms",
  })

  function logg() {
    console.log()
  }
  //scrollbar-hide
  return (
    <div className="w-full mt-10 ">
      <div className="grid xl:grid-cols-4 justify-items-center lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 relative items-center justify-center w-[100%] max-w-[77rem]  xl:w-[85%] mx-auto">
        {/* <button className="absolute left-16 rounded-md border border-black z-50 flex justify-center items-center">
          <ChervRight w={"50"} height="50" />
        </button> */}
        {data
          //@ts-ignore
          ?.slice(-8)
          ?.reverse()
          .map((room: any, i: string) => (
            <Reveal key={i}>
              <HomeChanceRoomItem i={i} contractAddress={room} handleClickOpen={handleClickOpen} />
            </Reveal>
          ))}
        {/* <button className="absolute right-16 rotate-180 rounded-md border border-black z-50 flex justify-center items-center">
          <ChervRight w={"50"} height="50" />
        </button> */}
      </div>
      {/* <Toaster richColors position="top-right" /> */}
      {/* <SimpleDialog open={open} onClose={handleClose} modalContent={modalContent} /> */}
    </div>
  )
}

export default NftList
