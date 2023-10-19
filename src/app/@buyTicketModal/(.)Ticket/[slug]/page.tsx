"use client"
import { useCallback, useRef, useEffect, MouseEventHandler, useState } from "react"

import BlueBtn from "../../../../assets/img/blueButton.svg"
import Down from "../../../../assets/img/down.svg"
import Loader2 from "../../../../assets/img/loader-2.svg"
import Up from "../../../../assets/img/upp.svg"
import { useRouter } from "next/navigation"
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { Toaster, toast } from "sonner"
import { polygon } from "wagmi/chains"
import { mainAbi } from "@/assets/abis/mainAbis"
import { formatEther, parseEther } from "viem"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"
import Image from "next/image"
import Button from "@/components/Button"
import Link from "next/link"
import { useDebounce } from "@/hooks/useDebounce"
import { MyButton } from "@/components/ui/MyButton"
const page = ({ params: { slug } }: any) => {
  const router = useRouter()
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const [amount, setAmount] = useState<number>(1)
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
  })
  let ticketLeftNUmber =
    parseInt(data[1]?.result["Uint256"].maximumTicket) -
    parseInt(data[1]?.result["Uint256"].soldTickets)

  //@ts-ignore
  const realPrice = formatEther(data?.at(1)?.result["Uint256"].ticketPrice)
  // console.log(data?.at(1)?.result.Uint256?.ticketPrice)
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
        toast.error("You don't have enough matic + Gas for this transaction.")
      }
    },
  })
  const {
    write,
    data: writeData,
    error,
    isLoading: writeLoading,
    isError,
  } = useContractWrite(mainConf)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess: wroteSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess(data) {
      refetch()
    },
  })

  useEffect(() => {
    refetch()
  }, [wroteSuccess])

  function handleBuyTicket() {
    console.log(account.isConnected)
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

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])

  function handleamount(work: "inc" | "dec") {
    // toast("sorry you can buy just 1 ticket for now!")
    if (work === "inc") {
      if (amount < ticketLeftNUmber) {
        setAmount((prev) => prev + 1)
      } else {
        if (ticketLeftNUmber == 0) toast.error("no more ticket left!")
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
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-50" style={{}} ref={overlay} onClick={onClick}>
      <Toaster position="top-right" richColors />
      <div
        className="flex container items-center h-full  justify-center xl:w-[65%] lg:w-[90%] w-full mx-auto"
        ref={wrapper}
      >
        <div className="relative bg-secondaryLight w-full  h-[37rem] px-2 rounded-3xl border-4 border-black">
          {/* <span className="absolute top-4 right-4 cursor-pointer" onClick={() => router.back()}>
            X
          </span> */}
          <div className="w-full h-full flex xl:flex-col flex-row justify-between py-5 items-center">
            <div className="w-full flex xl:flex-row flex-col-reverse justify-between px-3">
              <div>
                <a
                  href={`https://polygonscan.com/address/${slug}`}
                  target="_blank"
                  className="font-medium text-[30px] font-pop underline w-full"
                >
                  <span className="">
                    {/* <span className="hidden xl:block">{slug}</span> */}
                    <span className="block">{slug?.slice(0, 10)}</span>
                  </span>
                </a>
                <p className="font-zen text-2xl mt-3">{data?.at(3).result.slice(0, 15)}</p>
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
                <p>
                  <span className="font-pop font-bold text-[28px]">suplly: </span>
                  {isPending ? (
                    <Loader2 className="mt-1 mr-1 animate-spin scale-120" />
                  ) : (
                    <span className="font-pop font-bold  text-[26px]">
                      {`${//@ts-ignore
                      data[1]?.result["Uint256"].maximumTicket.toString()}${"\\"}${//@ts-ignore
                      data[1]?.result["Uint256"].soldTickets.toString()}`}
                    </span>
                  )}
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
              {/*  */}
              <div className="bg-slate-100 h-fit py-1 w-fit px-1 border-2 border-secondary rounded-3xl flex justify-center items-center">
                {isLoading ? (
                  <Skeleton animation="wave" variant="rounded" width={220} height={220} />
                ) : (
                  <Image
                    className=" rounded-3xl"
                    alt="nft"
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
            {/* Btns */}
            <div className="flex justify-between items-center xl:flex-row flex-col w-[90%] mx-auto mt-10 xl:pr-0 pr-5">
              {/* <Button fontW="font-zen" scale="0.85">
                <a className="w-full h-full" href={"/"}>
                  Home
                </a>
              </Button> */}

              <MyButton IHeight={90} IWidth={220} type="button">
                <a
                  className="w-[220px] h-[70px] flex justify-center items-center font-bold text-[1.7rem]"
                  href={"/"}
                >
                  Home
                </a>
              </MyButton>
              <div className="flex items-center">
                <div className="relative">
                  <div className="relative   w-[309px] h-[165px]" onClick={handleBuyTicket}>
                    <span
                      style={{
                        opacity: !write ? "0.7" : "1",
                        cursor: !write ? "not-allowed" : "pointer",
                      }}
                      className="absolute top-[56px] lg:left-[25%] left-[26%] font-medium text-[30px] z-50 font-pop text-black cursor-pointer"
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
                    style={{
                      opacity: !write ? "0.7" : "1",
                      cursor: !write ? "not-allowed" : "pointer",
                    }}
                    className="hover:-translate-y-1 duration-300 cursor-pointer"
                    onClick={() => {
                      if (!write) {
                        if (ticketLeftNUmber == 0) {
                          toast.error("no more Ticker left!")
                        }
                      } else {
                        handleamount("inc")
                      }
                    }}
                  />
                  <Down
                    style={{
                      opacity: !write ? "0.7" : "1",
                      cursor: !write ? "not-allowed" : "pointer",
                    }}
                    className="hover:translate-y-1 duration-300 cursor-pointer"
                    onClick={() => {
                      if (!write) {
                        if (ticketLeftNUmber == 0) {
                          toast.error("no more Ticker left!")
                        }
                      } else {
                        handleamount("dec")
                      }
                    }}
                  />
                </div>
              </div>

              <MyButton IHeight={90} IWidth={220} type="button">
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
          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default page
