"use client";
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
import { useAccount, useContractRead } from "wagmi"
import HomeChanceRoomItem from "./HomeChanceRoomItem"

const chanceRooms = [
  { address: "0x000010c5f500F2E2b0d315630266E744224A9FB6" },
  { address: "0x00000ed1c3b249ca62252d70f813369f9d8a8bc3" },
  { address: "0x0000e01d6b4a67b605c9b86c3815b89b4564a77d" },
  { address: "0x000004189e37496d9e8acc68e8e19074696902a2" },
  { address: "0x00000cb9b9920a4eed7b48aee33c038dc4234478" },
  { address: "0x0000094ab825b6275a3482287981471e3ebcadde" },
  { address: "0x000004f83f0f31ccbefe14ca8eb33ace92ada3a8" },
  { address: "0x00000783facddb2593dafdf596f7962d506d31bd" },
]

export interface SimpleDialogProps {
  open: boolean
  selectedValue?: string
  onClose: any
  modalContent?: any
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, modalContent } = props
  const [amount, setAmount] = React.useState<number>(1)
  const route = useRouter()
  const account = useAccount()

  const handleClose = () => {
    onClose()
    // console.log(modalContent)
  }

  function handleamount(work: "inc" | "dec") {
    if (work === "inc") {
      if (amount < 10) {
        setAmount((prev) => prev + 1)
      } else {
        toast("just 10 ticket available now!")
      }
    }
    if (work === "dec") {
      if (amount > 1) {
        setAmount((prev) => prev - 1)
      } else {
        toast("you must have at least 1 ticket")
      }
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={"lg"}
      sx={{ display: "flex", height: "100%", flexDirection: "column", borderRadius: 67 }}
    >
      <div className="rounded-3xl border-7 border-black  px-10 pt-5 bg-secondaryLight">
        <div className="w-full flex justify-between">
          <div>
            <h3 className="font-bold text-[50px] font-pop">Lott #1</h3>
            <p className="font-zen text-2xl mt-3">{modalContent.name}</p>
            <p>
              <span className="font-pop font-bold text-[28px]">Spain date: </span>
              <span className="font-pop font-normal text-[26px]">
                {modalContent.spainDate}
                {modalContent.time}
              </span>
            </p>
            <p>
              <span className="font-pop font-bold text-[28px]">suplly: </span>
              <span className="font-pop font-normal text-[26px]">{modalContent.suplly}</span>
            </p>
            <p className="mb-2">
              <span className="font-pop font-bold text-[28px]">price:</span>
              <span className="font-pop font-[500] text-[26px]">{modalContent.price}Matic</span>
            </p>
            <p className="font-pop font-bold text-[28px]">suplly</p>
            <span className="font-pop font-bold  text-[26px]">{modalContent.suplly}</span>
          </div>

          <div>
            <Image alt="nft" src={"/dum.png"} width={220} height={220} />
          </div>
        </div>
        <div className="flex justify-between items-center lg:flex-row flex-col">
          <Button fontW="font-zen" scale="0.85" onClick={handleClose}>
            Back
          </Button>
          <div className="flex items-center">
            <div className="relative">
              <span className="absolute top-[32%] left-[19%] font-medium text-2xl font-pop text-black cursor-pointer">
                {amount}
              </span>
              <BlueBtn className="cursor-pointer " />
              <span className="absolute bottom-[20%] left-[30%] mt-[60px] text-[13px] text-primary cursor-pointer">
                view on opensea
              </span>
            </div>
            <div className="mb-4 pr-5 -translate-x-2 flex flex-col gap-y-2">
              <Up
                className="hover:-translate-y-1 duration-300 cursor-pointer"
                onClick={() => handleamount("inc")}
              />
              <Down
                className="hover:translate-y-1 duration-300 cursor-pointer"
                onClick={() => handleamount("dec")}
              />
            </div>
          </div>
          <Button
            scale="0.85 translate-y-4"
            className="translate-y-4"
            onClick={() => {
              route.push(`tickets/${account.address}`)
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </Dialog>
  )
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

  return (
    <div className="w-full mt-10">
      {/* <button onClick={logg}>logg</button> */}
      <div className="flex  flex-wrap px-[4rem] xl:justify-between justify-center gap-y-12">
        {chanceRooms.map((room: any, i) => (
          <Reveal key={i}>
            <HomeChanceRoomItem
              i={i}
              contractAddress={room.address}
              handleClickOpen={handleClickOpen}
            />
          </Reveal>
        ))}
      </div>
      {/* <Toaster richColors position="top-right" /> */}
      <SimpleDialog open={open} onClose={handleClose} modalContent={modalContent} />
    </div>
  )
}

export default NftList
