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

import HomeChanceRoomItem from "./HomeChanceRoomItem"
import { sampAbi } from "@/assets/abis/smap"
import Link from "next/link"
import { secondAbiBC3, secondAbiFB6, wagmiAbiii } from "@/assets/abis/mainAbis"
import { BaseError, parseEther, formatEther } from "viem"
import { stringify } from "@/lib/stringify"
import { useDebounce } from "@/hooks/useDebounce"
import { Skeleton } from "@mui/material"

const chanceRooms = [
  // { address: "0x00000ed1c3b249ca62252d70f813369f9d8a8bc3" },
  // { address: "0x0000e01d6b4a67b605c9b86c3815b89b4564a77d" },
  // { address: "0x000004189e37496d9e8acc68e8e19074696902a2" },
  // { address: "0x00000cb9b9920a4eed7b48aee33c038dc4234478" },
  // { address: "0x0000094ab825b6275a3482287981471e3ebcadde" },
  // { address: "0x000004f83f0f31ccbefe14ca8eb33ace92ada3a8" },
  { address: "0x00000783facddb2593dafdf596f7962d506d31bd" },
  { address: "0x00000b324663D7982e44f87a3F6bf077EdA21c2f" },
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
  // const realPriceOf = modalContent?.realPrice?.toString()
  const balanceOfTicket = useDebounce(modalContent.realPrice1)

  const { config } = usePrepareContractWrite({
    address: modalContent.contractAddress,
    abi: secondAbiBC3,
    functionName: "purchaseTicket",
    args: [],
    value: balanceOfTicket ? parseEther(balanceOfTicket as `${number}`) : undefined,
    //@ts-ignore
    // value: parseEther("1"),
    // onError(error) {
    //   if (
    //     //@ts-ignore
    //     error?.docsPath == "/docs/contract/simulateContract"
    //   ) {
    //     console.log(error)
    //   } else {
    //     console.log("222")
    //     toast.error("transaction rejected!")
    //     route.refresh()
    //   }
    // },
    onSuccess(data) {
      route.refresh()
    },
  })
  const { write, data, error, isLoading, isError } = useContractWrite(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

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

  function handleBuyTicket() {
    console.log(modalContent.realPrice1)
    write?.()
  }

  function logg() {
    console.log(error)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={"lg"}
      sx={{ display: "flex", height: "100%", flexDirection: "column", borderRadius: 67 }}
    >
      <div className="rounded-3xl border-7 border-black  px-10 pt-5 bg-secondaryLight overflow-hidden">
        <div className="w-full flex justify-between flex-col-reverse xl:flex-row gap-y-10">
          <div>
            <a
              href={`https://polygonscan.com/address/${modalContent.contractAddress}`}
              target="_blank"
              className="font-medium text-[30px] font-pop underline w-full"
            >
              <span className="hidden lg:block">{modalContent.contractAddress}</span>
              <span className="block lg:hidden">{modalContent.contractAddress?.slice(0, 9)}</span>
            </a>
            <p className="font-zen text-2xl mt-3">{modalContent.name}</p>
            <p>
              <span className="font-pop font-bold text-[28px]">Spain date: </span>
              <span className="font-pop font-normal text-[26px]">
                {modalContent.spainDate}
                {/* {modalContent.time} */}
              </span>
            </p>
            <p>
              <span className="font-pop font-bold text-[28px]">suplly: </span>
              <span className="font-pop font-normal text-[26px]">{modalContent.totalSuplly}</span>
            </p>
            <p className="mb-2">
              <span className="font-pop font-bold text-[28px]">price:</span>
              <span className="font-pop font-[500] text-[26px]">{modalContent.price}Matic</span>
            </p>
            <p className="font-pop font-bold text-[28px]">suplly</p>
            <span className="font-pop font-bold  text-[26px]">{modalContent.suplly}</span>
          </div>

          <div className="bg-slate-100 h-[25%] border-2 border-primary px-3  rounded-3xl flex justify-center items-center">
            <Image alt="nft" src={modalContent.nftImg} width={220} height={220} />
          </div>
        </div>
        <div className="flex justify-between items-center lg:flex-row flex-col">
          <Button fontW="font-zen" scale="0.85" onClick={handleClose}>
            Back
          </Button>
          <div className="flex items-center">
            <div className="relative">
              <div className="relative  w-[16rem] h-[9rem]" onClick={handleBuyTicket}>
                <span
                  style={{
                    opacity: isLoading ? "0.7" : "1",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                  className="absolute top-[27%] lg:left-[25%] left-[26%] font-medium text-2xl z-50 font-pop text-black cursor-pointer"
                >
                  {amount}
                </span>
                {/* <div className="bg-slate-300 absolute w-9 h-11">
                </div> */}
                <BlueBtn
                  style={{
                    opacity: isLoading ? "0.7" : "1",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                  className="cursor-pointer lg:scale-[0.8] scale-[0.9] z-0 absolute -top-4 max-[1000px]:-right-[22px] "
                />
              </div>

              <a
                href={`https://opensea.io/assets/matic/${modalContent.title}`}
                target="_blank"
                className="absolute bottom-[20%] w-full  lg:left-[0%] left-[7%] mt-[60px] text-[13px] text-primary cursor-pointer text-center"
              >
                view on opensea
              </a>
            </div>
            <div className="mb-4 lg:-translate-x-6 translate-x-1 flex flex-col gap-y-2">
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
          <Button scale="0.85" className="translate-y-5" styless="-translate-y-5">
            <Link
              href={{
                pathname: `tickets/${account.address}`,
                query: {
                  chanceRoomAddress: modalContent.contractAddress,
                  totalSupply: modalContent.totalSuplly,
                },
              }}
              className="w-full h-full"
            >
              Continue
            </Link>
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

  function logg() {
    console.log("wtf")
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
