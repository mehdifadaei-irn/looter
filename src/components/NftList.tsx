"use client"
import Image from "next/image"
import React from "react"
import Reveal from "./ui/Reveal"
import Button from "./Button"

import Dialog from "@mui/material/Dialog"
import BlueBtn from "../assets/img/blueButton.svg"
import Up from "../assets/img/upp.svg"
import Down from "../assets/img/down.svg"
import { Toaster, toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { useConnectModal } from "@rainbow-me/rainbowkit"
import HomeChanceRoomItem from "./HomeChanceRoomItem"
import Link from "next/link"
import { FactoryAbi, secondAbiBC3, secondAbiFB6, wagmiAbiii } from "@/assets/abis/mainAbis"
import { BaseError, parseEther, formatEther } from "viem"
import { stringify } from "@/lib/stringify"
import { useDebounce } from "@/hooks/useDebounce"
import { Skeleton } from "@mui/material"

const chanceRooms = [
  // { address: "0x00000ed1c3b249ca62252d70f813369f9d8a8bc3" },
  // { address: "0x0000e01d6b4a67b605c9b86c3815b89b4564a77d" },
  // { address: "0x000004189e37496d9e8acc68e8e19074696902a2" },
  { address: "0x00000cb9b9920a4eed7b48aee33c038dc4234478" },
  { address: "0x0000094ab825b6275a3482287981471e3ebcadde" },
  { address: "0x000004f83f0f31ccbefe14ca8eb33ace92ada3a8" },
  { address: "0x00000783facddb2593dafdf596f7962d506d31bd" },
  { address: "0x00000b324663D7982e44f87a3F6bf077EdA21c2f" },
]

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
    <div className="w-full mt-10 overflow-x-auto scrollbar-hide">
      <div className="flex xl:pl-[4rem] pl-[32rem] md:pr-[4rem] px-0 xl:justify-between justify-center gap-x-4 scrollbar-hide">
        {data
          //@ts-ignore
          ?.slice(-4)
          ?.reverse()
          .map((room: any, i: string) => (
            <Reveal key={i}>
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
