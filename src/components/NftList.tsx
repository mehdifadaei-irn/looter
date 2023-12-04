"use client"
import React, { useRef } from "react"
import Reveal from "./ui/Reveal"

import { useDraggable } from "react-use-draggable-scroll"
import { useContractRead } from "wagmi"

import { useConnectModal } from "@rainbow-me/rainbowkit"
import HomeChanceRoomItem from "./HomeChanceRoomItem"

import { FactoryAbi } from "@/assets/abis/mainAbis"
import { useScroll, useTransform, motion } from "framer-motion"

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

  return (
    <div className="w-full mt-10 overflow-x-auto scrollbar-hide ">
      <div className="flex  xl:pl-[4rem]  md:pr-[4rem] px-0 xl:justify-between  justify-start gap-x-4 ">
        {data
          //@ts-ignore
          ?.slice(-7)
          ?.reverse()
          .map((room: any, i: string) => (
            <Reveal width="23rem" key={i}>
              <HomeChanceRoomItem i={i} contractAddress={room} handleClickOpen={handleClickOpen} />
            </Reveal>
          ))}
      </div>
      {/* <Toaster richColors position="top-right" /> */}
      {/* <SimpleDialog open={open} onClose={handleClose} modalContent={modalContent} /> */}
    </div>
  )
}

export default NftList
