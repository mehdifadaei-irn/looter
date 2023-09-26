"use client"
import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import BlueBtn from "../../../../assets/img/blueButton.svg"
import Down from "../../../../assets/img/down.svg"
import Up from "../../../../assets/img/upp.svg"
import { useRouter } from "next/navigation"
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { toast } from "sonner"
import { polygon } from "wagmi/chains"
import { secondAbiBC3 } from "@/assets/abis/mainAbis"
import { formatEther, parseEther } from "viem"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"
import { useDebounce } from "@/hooks/useDebounce"
import ChanseRoomName from "@/components/chanceRoom/ChanseRoomName"
import Navbar from "@/components/Navbar"
const page = ({ params: { slug } }: any) => {
  const [amount, setAmount] = React.useState<number>(1)
  const route = useRouter()
  const account = useAccount()
  const { openConnectModal } = useConnectModal()

  const { data: metaData }: { data: any } = useQuery({
    queryKey: ["getMetadata", `${slug}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/nft/${slug}/0?chain=polygon&format=decimal&normalizeMetadata=true&media_items=false`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        },
      )

      return data
    },
  })

  function handleamount(work: "inc" | "dec") {
    toast("sorry you can buy just 1 ticket for now!")
    // if (work === "inc") {
    //   if (amount < 10) {
    //     setAmount((prev) => prev + 1)
    //   } else {
    //     toast("just 10 ticket available now!")
    //   }
    // }
    // if (work === "dec") {
    //   if (amount > 1) {
    //     setAmount((prev) => prev - 1)
    //   } else {
    //     toast("you must have at least 1 ticket")
    //   }
    // }
  }

  const { data, isLoading }: { data: any; isLoading: boolean } = useContractReads({
    contracts: [
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "status",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "layout",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "tokenURI",
        args: ["0"],
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "name",
        chainId: polygon.id,
      },
    ],
  })

  //@ts-ignore
  const realPrice = formatEther(data?.at(1)?.result["Uint256"].ticketPrice)
  // console.log(data?.at(1)?.result.Uint256?.ticketPrice)
  const balanceOfTicket = useDebounce(realPrice)
  // console.log(balanceOfTicket)

  const { config } = usePrepareContractWrite({
    address: slug,
    abi: secondAbiBC3,
    functionName: "purchaseTicket",
    args: [],
    //@ts-ignore
    value: balanceOfTicket ? parseEther(balanceOfTicket as `${number}`) : undefined,
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
    onError(err) {
      console.log("1")
      toast.error("You don't have enough matic + Gas for this transaction.")
    },
  })
  const {
    write,
    data: writeData,
    error,
    isLoading: writeLoading,
    isError,
  } = useContractWrite(config)

  function handleBuyTicket() {
    console.log("W")
    if (account.isConnected) {
      write?.()
    } else {
      toast.error("you must connect your wallet!")
      openConnectModal?.()
    }
  }

  //@ts-ignore
  const timstamp = `${data?.at(1)?.result?.Uint256?.deadLine.toString().slice(0, -1)}${"0000"}`

  const deadtime = new Date(
    //@ts-ignore
    parseInt(timstamp),
  )
  const { data: balanceOf, isLoading: blanceLoading }: { data: any; isLoading: boolean } =
    useContractRead({
      address: slug,
      abi: secondAbiBC3,
      functionName: "balanceOf",
      args: [account.address],
    })

  return (
    <div className=" w-full h-screen backg flex items-center flex-col">
      <Navbar />
      <div className=" w-full h-full flex justify-center items-center flex-col">
        <div className=" xl:w-[70%] lg:w-[97%] w-full px-5 rounded-3xl bg-secondaryLight lg:h-[70%] h-[80%] flex flex-col justify-end items-center mx-auto border-4 border-black">
          <div className=" flex justify-between gap-x-5 w-full flex-row lg:gap-y-10 gap-y-1">
            <div>
              <a
                href={`https://polygonscan.com/address/${slug}`}
                target="_blank"
                className="font-medium text-[30px] font-pop underline w-full"
              >
                <span className="">
                  <span className="hidden xl:block">{slug}</span>
                  <span className="block xl:hidden">{slug?.slice(0, 9)}</span>
                </span>
              </a>
              {isLoading ? (
                <div>loading</div>
              ) : (
                <p className="font-zen text-2xl mt-3">{data?.at(3).result.slice(0, 15)}</p>
              )}

              <p>
                <span className="font-pop font-bold text-[28px]">Spain date: </span>
                <span className="font-pop font-normal text-[26px]">
                  {`${deadtime.getUTCDate()} ${deadtime.toLocaleString("default", {
                    month: "long",
                  })} -${deadtime.getUTCHours()}:${deadtime.getUTCMinutes()}:${deadtime.getUTCSeconds()} `}
                  UTC
                  {/* {modalContent.time} */}
                </span>
              </p>
              {/* <ChanseRoomName contractAddress={slug} /> */}
              <p>
                <span className="font-pop font-bold text-[28px]">
                  You Have {!balanceOf ? "0" : balanceOf?.toString()} Ticket
                </span>
              </p>
              <p>
                <span className="font-pop font-bold text-[28px]">suplly: </span>
                <span className="font-pop font-normal text-[26px]">
                  {data[1]?.result["Uint256"].maximumTicket.toString()}
                </span>
              </p>
              <p className="mb-2">
                <span className="font-pop font-bold text-[28px]">price:</span>
                <span className="font-pop font-[500] text-[26px]">
                  {formatEther(data?.at(1)?.result?.Uint256?.ticketPrice)}Matic
                </span>
              </p>
              <p className="font-pop font-bold text-[28px]">suplly</p>
              <span className="font-pop font-bold  text-[26px]">
                {`${//@ts-ignore
                data[1]?.result["Uint256"].maximumTicket.toString()}${"\\"}${//@ts-ignore
                data[1]?.result["Uint256"].soldTickets.toString()}`}
              </span>
            </div>

            <div className="bg-slate-100 h-fit py-1 w-fit px-1 border-2 border-secondary rounded-3xl flex justify-center items-center">
              {isLoading ? (
                <Skeleton animation="wave" variant="rounded" width={220} height={220} />
              ) : (
                <Image
                  className=" rounded-3xl"
                  alt="nft"
                  src={metaData?.normalized_metadata.image}
                  width={220}
                  height={220}
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <div className="relative  w-[16rem] h-[9rem]" onClick={handleBuyTicket}>
                <span
                  style={{
                    opacity: !write ? "0.7" : "1",
                    cursor: !write ? "not-allowed" : "pointer",
                  }}
                  className="absolute top-[27%] lg:left-[25%] left-[26%] font-medium text-2xl z-50 font-pop text-black cursor-pointer"
                >
                  {amount}
                </span>
                {/* <div className="bg-slate-300 absolute w-9 h-11">
                </div> */}
                <BlueBtn
                  style={{
                    opacity: !write ? "0.7" : "1",
                    cursor: !write ? "not-allowed" : "pointer",
                  }}
                  className="cursor-pointer lg:scale-[0.8] scale-[0.9] z-0 absolute -top-4 max-[1000px]:-right-[22px] "
                />
              </div>

              <a
                href={`https://opensea.io/assets/matic/${metaData?.token_address}`}
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
        </div>

        <div className="flex justify-between items-center flex-row xl:w-[70%] w-[90%] mx-auto">
          <Button fontW="font-zen" scale="0.85">
            <a className="w-full h-full" href={"/"}>
              Home
            </a>
          </Button>

          <Button scale="0.85" className="translate-y-5" styless="-translate-y-5">
            <a href={`/lottery/${slug}`} className="w-full h-full">
              Continue
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
//href={`/lottery/${other.searchParams.chanceRoomAddress}`}
export default page
