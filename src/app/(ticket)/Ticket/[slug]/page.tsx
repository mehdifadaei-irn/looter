"use client"
import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"

import Loader2 from "../../../../assets/img/loader-2.svg"
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
  useWaitForTransaction,
} from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { toast } from "sonner"
import { polygon } from "wagmi/chains"
import { mainAbi } from "@/assets/abis/mainAbis"
import { formatEther, parseEther } from "viem"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"
import { useDebounce } from "@/hooks/useDebounce"
import ChanseRoomName from "@/components/chanceRoom/ChanseRoomName"
import Navbar from "@/components/Navbar"
import { ArrowBack, BlueBttn, RectMain } from "@/components/Icons"
import { MyButton } from "@/components/ui/MyButton"

const edr = true

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

  const [realPricee, setRealPricee] = React.useState<any>()

  const {
    data,
    isLoading,
    refetch,
  }: {
    data: any
    isLoading: boolean
    refetch: any
  } = useContractReads({
    contracts: [
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: mainAbi,
        functionName: "status",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: mainAbi,
        functionName: "layout",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: mainAbi,
        functionName: "tokenURI",
        args: ["0"],
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: slug,
        //@ts-ignore
        abi: mainAbi,
        functionName: "name",
        chainId: polygon.id,
      },
    ],
    onSuccess(data) {
      setRealPricee(formatEther(data?.at(1)?.result["Uint256"].ticketPrice))
    },
  })

  let ticketLeftNUmber =
    parseInt(data[1]?.result["Uint256"].maximumTicket) -
    parseInt(data[1]?.result["Uint256"].soldTickets)

  //@ts-ignore

  const balanceOfTicket = useDebounce(realPricee)
  const balanceOfTicket1 = (balanceOfTicket * amount).toString()

  const { config: mainConf } = usePrepareContractWrite({
    address: slug,
    abi: mainAbi,
    functionName: "purchaseBatchTicket",
    args: [amount.toString()],
    //@ts-ignore
    value: balanceOfTicket ? parseEther(balanceOfTicket1 as `${number}`) : undefined,
    onSuccess(data) {
      refetch()
      route.refresh()
    },
    onError(err) {
      if (ticketLeftNUmber == 0) {
        toast.error("no more Ticker left!")
      } else {
        // console.log(, "the1E")
        if (err.toString().slice(0, 10) !== "ContractFu") {
          toast.error("You don't have enough matic + Gas for this transaction.")
        }
      }
    },
  })

  const { write, isLoading: writeLoading, data: writeData } = useContractWrite(mainConf)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess: wroteSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess(data) {
      toast.success(
        <div className="flex flex-row items-center justify-center gap-x-5">
          <span className="text-lg font-bold">You Buyed {amount.toString()} Ticket</span>
          <Image src={"/peClap.gif"} alt="my gif" height={30} width={30} />
        </div>,
      )
      refetch()
    },
  })

  useEffect(() => {
    refetch()
  }, [wroteSuccess])

  function handleBuyTicket() {
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
      abi: mainAbi,
      functionName: "balanceOf",
      args: [account.address],
    })

  function handleamount(work: "inc" | "dec") {
    // toast("sorry you can buy just 1 ticket for now!")
    if (work === "inc") {
      if (amount < ticketLeftNUmber) {
        setAmount((prev) => prev + 1)
      } else {
        toast(`just ${ticketLeftNUmber} ticket available now!`)
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

  function logg() {}
  // console.log(metaData?.normalized_metadata.image.toString().slice(0, 2), "met")
  return (
    <div className=" w-full overflow-x-hidden overflow-y-auto h-screen backg flex items-center justify-between flex-col  relative">
      <RectMain
        width={1100}
        height={620}
        className="absolute z-0 top-[120px] w-[90%] min-w-[56rem] lg:block hidden"
      />
      <Navbar />
      {/* <button onClick={logg}>Log</button> */}
      <div className=" w-full h-full flex  items-center flex-col z-20 ">
        <div className="md:mt-0 mt-4 max-w-[900px] xl:w-[70%] lg:w-[97%] w-[84%] md:pb-6 px-5 rounded-3xl  md:h-[40rem] h-[45rem]  flex flex-col justify-end items-center mx-auto">
          <div className=" flex justify-between md:gap-x-5 w-full md:items-start items-center md:flex-row flex-col-reverse lg:gap-y-10 md:gap-y-1 gap-y-3 ">
            <div>
              <a
                href={`https://polygonscan.com/address/${slug}`}
                target="_blank"
                className="font-bold xl:text-[30px] text-[25px] font-pop underline w-full"
              >
                <span className="">
                  {/* <span className="hidden xl:block">{slug}</span> */}
                  <span className="block">{slug?.slice(0, 9)}</span>
                </span>
              </a>
              {isLoading ? (
                <div>loading</div>
              ) : (
                <p className="font-zen 2xl:text-2xl text-xl mt-3">
                  {data?.at(3).result.slice(0, 15)}
                </p>
              )}

              <p>
                <span className="font-pop xl:font-bold font-[500] xl:text-[28px] text-[25px]">
                  Spain date:{" "}
                </span>
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
                <span className="font-pop xl:font-bold font-[500] xl:text-[28px] text-[25px]">
                  You Have {!balanceOf ? "0" : balanceOf?.toString()} Ticket
                </span>
              </p>
              <p>
                <span className="font-pop xl:font-bold font-[500] xl:text-[28px] text-[25px]">
                  suplly:{" "}
                </span>
                <span className="font-pop font-normal xl:text-[26px] text-[24px]">
                  {data[1]?.result["Uint256"].maximumTicket.toString()}
                </span>
              </p>
              <p className="mb-2">
                <span className="font-pop xl:font-bold font-[500] xl:text-[28px] text-[25px]">
                  price:
                </span>
                <span className="font-pop xl:font-[500] font-[400] xl:text-[26px] text-[24px]">
                  {formatEther(data?.at(1)?.result?.Uint256?.ticketPrice)}Matic
                </span>
              </p>
              <p className="font-pop xl:font-bold font-[500] xl:text-[28px] text-[25px]">suplly</p>
              {isPending ? (
                <Loader2 className="mt-1 mr-1 animate-spin scale-120" />
              ) : (
                <span className="font-pop xl:font-[500] font-[400]  text-[26px]">
                  {`${//@ts-ignore
                  data[1]?.result["Uint256"].maximumTicket.toString()}${"\\"}${//@ts-ignore
                  data[1]?.result["Uint256"].soldTickets.toString()}`}
                </span>
              )}
            </div>

            <div className="bg-slate-100 h-fit py-1 w-fit px-1 border-2 border-secondary rounded-3xl flex justify-center items-center">
              {isLoading ? (
                <Skeleton animation="wave" variant="rounded" width={220} height={220} />
              ) : (
                <Image
                  className=" rounded-3xl"
                  alt="nftt"
                  src={
                    metaData?.normalized_metadata.image.toString().slice(0, 4) == "http"
                      ? "https://ipfs.io/ipfs/QmT37EzSmQSUV1iMxxBBmG5T3WAt15rfPZvQfajEhsVATF/pfp0_5566.png"
                      : metaData?.normalized_metadata.image
                  }
                  width={220}
                  height={220}
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col">
              <div
                className="relative  w-[250px] h-[68px] flex justify-center items-center z-0"
                onClick={handleBuyTicket}
                style={{
                  opacity: !write || isPending ? "0.7" : "1",
                  cursor: !write || isPending ? "not-allowed" : "pointer",
                }}
              >
                <span
                  style={{
                    opacity: !write || isPending ? "0.7" : "1",
                    cursor: !write || isPending ? "not-allowed" : "pointer",
                  }}
                  className={`absolute top-[10px]  ${
                    isPending ? "left-[8%] " : "left-[22%]"
                  } font-medium text-[30px] z-50 font-pop text-black cursor-pointer`}
                >
                  {isPending ? <Loader2 className="mt-2  animate-spin scale-120" /> : `${amount}`}
                </span>
                <div className={isPending ? "scale-x-[1.3] scale-y-[1.1] mr-5" : ""}>
                  <BlueBttn width={180} height={150} />
                </div>
                <span
                  className="absolute top-[13px] pl-4 font-bold  z-50 font-pop text-black"
                  style={{
                    opacity: !write || isPending ? "0.7" : "1",
                    cursor: !write || isPending ? "not-allowed" : "pointer",
                    fontSize: !write || isPending ? "23px" : "28px",
                  }}
                >
                  {isPending ? "Pending..." : "Mint"}
                </span>
              </div>

              <a
                href={`https://opensea.io/assets/matic/${metaData?.token_address}`}
                target="_blank"
                className="  text-[13px] text-primary cursor-pointer text-center z-20"
              >
                view on opensea
              </a>
            </div>
            <div className="mb-4 lg:-translate-x-6 translate-x-1 flex flex-col gap-y-2">
              <Up
                style={{
                  opacity: !write ? "0.7" : "1",
                  // cursor: !write ? "not-allowed" : "pointer",
                }}
                className="hover:-translate-y-1 duration-300 cursor-pointer"
                onClick={() => {
                  if (ticketLeftNUmber == 0) {
                    toast.error("no more Ticker left!")
                  } else {
                    handleamount("inc")
                  }
                }}
              />
              <Down
                style={{
                  opacity: !write ? "0.7" : "1",
                  // cursor: !write ? "not-allowed" : "pointer",
                }}
                className="hover:translate-y-1 duration-300 cursor-pointer"
                onClick={() => {
                  if (ticketLeftNUmber == 0) {
                    toast.error("no more Ticker left!")
                  } else {
                    handleamount("dec")
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center flex-row xl:w-[70%] w-[90%] mx-auto md:mt-10">
          <MyButton IHeight={90} IWidth={220} type="button" className="md:scale-100 scale-[0.76]">
            <a
              className="w-[220px] h-[70px] flex justify-center items-center font-bold text-[1.7rem] "
              href={"/"}
            >
              Home
            </a>
          </MyButton>
          <MyButton IHeight={90} IWidth={220} type="button" className="md:scale-100 scale-[0.76]">
            <a
              href={`/tickets/sang?chanceRoomAddress=${slug}&totalSupply=${data[1]?.result[
                "Uint256"
              ].maximumTicket.toString()}`}
              className="w-[220px] h-[70px] flex justify-center items-center font-bold text-[1.7rem]"
            >
              Continue
            </a>
          </MyButton>
        </div>
      </div>
    </div>
  )
}
//href={`/lottery/${other.searchParams.chanceRoomAddress}`}
export default page
