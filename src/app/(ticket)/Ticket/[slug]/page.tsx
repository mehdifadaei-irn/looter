"use client"
import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

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
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"
import { useDebounce } from "@/hooks/useDebounce"
import ChanseRoomName from "@/components/chanceRoom/ChanseRoomName"
import Navbar from "@/components/Navbar"
import { ArrowBack, BlueBttn, RectMain } from "@/components/Icons"
import { MyButton } from "@/components/ui/MyButton"

const edr = true

const page = ({ params: { slug } }: any) => {
  const [amount, setAmount] = useState<number>(1)
  const route = useRouter()
  const account = useAccount()
  const [mainData, setMainData] = useState<any>()
  const [errEnable, setErrEnable] = useState<boolean>(false)
  const { openConnectModal } = useConnectModal()
  const [imgbase64, setImgbase64] = useState<any>()

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
      try {
        let parsed = atob(data[2].result?.slice(29).toString())
        setImgbase64(JSON?.parse(parsed).image)
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }

      setMainData(data)
    },
  })

  let ticketLeftNUmber =
    //@ts-ignore
    parseInt(data?.at(1)?.result["Uint256"].maximumTicket) -
    //@ts-ignore
    parseInt(data?.at(1)?.result["Uint256"].soldTickets)

  //@ts-ignore
  const realPrice = formatEther(mainData?.at(1).result["Uint256"]?.ticketPrice || "")
  const balanceOfTicket = useDebounce(realPrice)
  //@ts-ignore
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

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
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

  function logg() {
    console.log(data)
  }
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-[85%]">
        <div className="flex  items-center h-full  justify-center 2xl:min-w-w-[65vw] xl:min-w-[80vw] min-w-[90vw]">
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <div className="relative bg-secondaryLight sm:w-full w-[90%]  sm:h-[37rem] px-2 rounded-3xl border-4 border-black">
              <div className="lg:w-full w-[97%] h-full flex xl:flex-col sm:flex-row flex-col justify-between sm:py-5 pt-2 items-center xl:mx-0 mx-auto sm:gap-y-0 gap-y-5 sm:pb-0 pb-5">
                <div className="w-full gap-y-2 flex xl:flex-row flex-col-reverse justify-between px-3 sm:items-start items-center">
                  <div>
                    <a
                      href={`https://polygonscan.com/address/${slug}`}
                      target="_blank"
                      className="font-medium xl:text-[30px] md:text-[25px] text-lg font-pop underline w-full"
                    >
                      <span className="">
                        {/* <span className="hidden xl:block">{slug}</span> */}
                        <span className="block">{slug?.slice(0, 16)}....</span>
                      </span>
                    </a>
                    <p className="font-zen 2xl:text-2xl text-xl mt-3">
                      {data?.at(3).result.slice(0, 15)}
                    </p>
                    <p>
                      <span className="font-pop xl:font-bold font-[500] xl:text-[28px] md:text-[25px] text-lg">
                        Spain date:{" "}
                      </span>
                      <span className="font-pop font-normal md:text-[25px] text-lg">
                        {`${deadtime.getUTCDate()} ${deadtime.toLocaleString("default", {
                          month: "long",
                        })} -${deadtime.getUTCHours()}:${deadtime.getUTCMinutes()}:${deadtime.getUTCSeconds()} `}
                        UTC
                        {/* {modalContent.time} */}
                      </span>
                    </p>
                    <div className="flex sm:flex-col flex-row sm:gap-x-0 gap-x-4 sm:h-auto h-7">
                      <p>
                        <span className="font-pop xl:text-[28px] md:text-[25px] text-lg">suplly: </span>
                        {isPending ? (
                          <Loader2 className="mt-1 mr-1 animate-spin scale-120" />
                        ) : (
                          <span className="font-pop xl:font-bold font-semibold  md:text-[25px] text-lg">
                            {`${//@ts-ignore
                            mainData
                              ?.at(1)
                              ?.result["Uint256"].maximumTicket.toString()}${"\\"}${//@ts-ignore
                            mainData?.at(1)?.result["Uint256"].soldTickets.toString()}`}
                          </span>
                        )}
                      </p>
                      <p className="mb-2">
                        <span className="font-pop xl:text-[28px] md:text-[25px] text-lg">price: </span>
                        <span className="font-pop xl:font-[500] font-[400] md:text-[25px] text-lg">
                          {realPrice}Matic
                        </span>
                      </p>
                    </div>
                    <a
                      href={`https://opensea.io/assets/matic/${slug}`}
                      target="_blank"
                      className="  text-[13px] text-primary cursor-pointer text-center z-20"
                    >
                      view on opensea
                    </a>
                  </div>
                  {/*  */}
                  <div className="bg-slate-100 h-fit py-1 w-fit px-1 border-2 border-secondary rounded-3xl flex justify-center items-center">
                    {isLoading ? (
                      <Skeleton animation="wave" variant="rounded" width={220} height={220} />
                    ) : (
                      <Image
                        className=" rounded-3xl sm:h-[220px] sm:w-[220px] h-[188px] w-[188px]"
                        alt="nft"
                        src={imgbase64 == undefined ? "/placeholder.png" : imgbase64}
                        width={220}
                        height={220}
                      />
                    )}
                  </div>
                </div>
                {/* Btns */}
                <div className="flex justify-between items-center xl:flex-row flex-col w-[90%] mx-auto md:mt-10 mt-0 xl:pr-0 md:pr-5 pr-10 sm:h-fit h-[12rem] sm:pb-0 pb-[5px]">
                  {/* <Button fontW="font-zen" scale="0.85">
                <a className="w-full h-full" href={"/"}>
                  Home
                </a>
              </Button> */}

                  <MyButton
                    IHeight={90}
                    IWidth={220}
                    type="button"
                    className="xl:!scale-100 sm:!scale-[0.85] !scale-[0.70] sm:ml-0 ml-[9px] z-50"
                  >
                    <a
                      className="w-[220px] h-[70px] flex justify-center items-center font-bold text-[1.7rem]"
                      href={"/"}
                    >
                      Home
                    </a>
                  </MyButton>
                  <div className="flex items-center xl:translate-x-0 translate-x-6 md:scale-100  scale-[0.85] z-0">
                    <div className="flex flex-col">
                      <div
                        onClick={handleBuyTicket}
                        style={{
                          opacity: !write || isPending ? "0.7" : "1",
                          cursor: !write || isPending ? "not-allowed" : "pointer",
                        }}
                        className={`animated-div ${
                          isHovered ? "paused" : ""
                        } relative  lg:w-[250px] w-[210px] h-[68px] flex justify-center items-center z-0`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span
                          style={{
                            opacity: !write || isPending ? "0.7" : "1",
                            cursor: !write || isPending ? "not-allowed" : "pointer",
                          }}
                          className={`absolute lg:top-[10px] top-[8px]  ${
                            isPending ? "left-[8%] " : "lg:left-[22%] left-[16%]"
                          } font-medium text-[30px] z-50 font-pop text-black cursor-pointer`}
                        >
                          {isPending ? (
                            <Loader2 className="mt-2  animate-spin scale-120" />
                          ) : (
                            `${amount}`
                          )}
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
                      <p className="w-full text-center flex justify-center font-pop xl:font-[500] font-[400] text-[25px]">
                        {
                          //@ts-ignore
                          balanceOfTicket * amount
                        }
                        Matic
                      </p>
                    </div>
                    <div className="mb-4 lg:-translate-x-6 translate-x-1 flex flex-col gap-y-2">
                      <Up
                        style={{
                          opacity: !write ? "0.7" : "1",
                          // cursor: !write ? "not-allowed" : "pointer",
                        }}
                        className="hover:-translate-y-1 duration-300 cursor-pointer"
                        onClick={() => {
                          setErrEnable(true)
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
                          setErrEnable(true)
                          if (ticketLeftNUmber == 0) {
                            toast.error("no more Ticker left!")
                          } else {
                            handleamount("dec")
                          }
                        }}
                      />
                    </div>
                  </div>

                  <MyButton
                    IHeight={90}
                    IWidth={220}
                    type="button"
                    className="xl:!scale-100 sm:!scale-[0.85] !scale-[0.70] sm:ml-0 ml-[9px] z-50"
                  >
                    <a
                      href={`/tickets/sang?chanceRoomAddress=${slug}&totalSupply=${parseInt(
                        data[1]?.result["Uint256"].maximumTicket,
                      )}`}
                      // href={`/tickets/sang?chanceRoomAddress=${slug}&totalSupply=20`}
                      className="w-[220px] h-[70px] flex justify-center items-center font-bold text-[1.7rem]"
                    >
                      Continue
                    </a>
                  </MyButton>
                </div>
              </div>
              {/*  */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
//href={`/lottery/${other.searchParams.chanceRoomAddress}`}
export default page
