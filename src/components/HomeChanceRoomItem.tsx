"use client"
import React, { useState } from "react"
import Image from "next/image"
import { useContractReads } from "wagmi"
import { mainAbi } from "@/assets/abis/mainAbis"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { polygon } from "wagmi/chains"
import Link from "next/link"
import { MyButton } from "./ui/MyButton"
import { VT323 } from "next/font/google"
import { cn } from "@/lib/utils"
import { DummyRect, PolygIcon } from "./Icons"
import { convertToRandomHexColor, stringToColour } from "@/lib/generateColorFromHash"

const VT323Font = VT323({
  subsets: ["latin"],
  weight: ["400"],
})

type ChanceRoomItemProps = {
  contractAddress: `0x${string}` | undefined
  i: number | string
  handleClickOpen: (nft: any) => void
  nft?: any
}

const HomeChanceRoomItem = ({ nft, handleClickOpen, i, contractAddress }: ChanceRoomItemProps) => {
  const [ChanceRoomState, setChanceRoomSate] = useState<string[]>([])
  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false)
  const [imgbase64, setImgbase64] = useState<any>()
  React.useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true)
  }, [])

  const { data, isLoading }: { data: any; isLoading: boolean } = useContractReads({
    contracts: [
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: mainAbi,
        functionName: "status",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: mainAbi,
        functionName: "layout",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: mainAbi,
        functionName: "tokenURI",
        args: ["0"],
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: mainAbi,
        functionName: "name",
        chainId: polygon.id,
      },
      {
        address: contractAddress,
        //@ts-ignore
        abi: mainAbi,
        functionName: "lockedNFT",
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
      setChanceRoomSate(data[0]?.result)
    },
  })
  //@ts-ignore
  const timstamp = `${data?.at(1)?.result?.Uint256?.deadLine.toString().slice(0, -1)}${"0000"}`

  const deadtime = new Date(
    //@ts-ignore
    parseInt(timstamp),
  )

  function logg() {
    console.log(imgbase64)
  }

  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return null
  } else {
    const date = new Date()
    return (
      <div key={i} className=" w-[23rem] flex flex-col items-center relative max-h-[33rem]">
        <div className="w-full flex justify-center items-center h-full absolute -top-[7%] bottom-0 right-0 left-0 flex-col gap-y-3">
          {ChanceRoomState?.at(0) === "Ticket selling" ||
          ChanceRoomState?.at(0) === "Not initialized" ? null : ChanceRoomState?.at(0) ===
            "Sold out" ? (
            <a
              href={`https://opensea.io/assets/matic/${data[4].result?.at(1)}/${parseInt(
                data[4].result?.at(2),
              )}`}
              target="_blank"
              className="w-[70%] z-30 flex justify-center items-center pt-16"
            >
              <Image
                style={{
                  maxWidth: "none",
                  height: "220px",
                  marginTop: "7rem",
                }}
                className=" absolute z-10 rounded-[24%] top-[1px] -translate-x-2  bg-contain mx-auto opacity-80 "
                src={"/soldOut.png"}
                alt="soldOut"
                width={225}
                height={220}
              />
            </a>
          ) : (
            <div className="w-[70%] z-30 pb-8">
              <p
                className={cn(" font-pop text-lg font-bold opacity-100 z-30  w-full text-center")}
              >
                {ChanceRoomState?.at(0)}
              </p>
              <p
                className={cn(" font-pop text-lg font-bold opacity-100 z-30  w-full text-center")}
              >
                {ChanceRoomState?.at(1)}
              </p>
            </div>
          )}
        </div>
        {/* <button onClick={logg} className="z-[50]">
          logg
        </button> */}

        {isLoading ? (
          <span>loading..</span>
        ) : (
          <div
            className="flex w-full justify-center flex-col items-center"
            style={{
              opacity: ChanceRoomState?.at(0) === "Ticket selling" ? 1 : 0.6,
            }}
          >
            <div className="w-full flex items-center justify-center scale-[0.95] ">
              <a
                href={`https://opensea.io/assets/matic/${data[4].result?.at(1)}/${parseInt(
                  data[4].result?.at(2),
                )}`}
                target="_blank"
                className="relative w-full h-[364px] flex items-center justify-center"
              >
                <div className="absolute z-0 top-[2px] bottom-0 right-0 left-0 mx-auto my-auto flex justify-center">
                  <DummyRect
                    width={300}
                    height={300}
                    color={convertToRandomHexColor(`${contractAddress as string}`)}
                  />
                </div>
                <Image
                  style={{
                    maxWidth: "none",
                    height: "280px",
                  }}
                  className=" absolute z-10 rounded-[24%] top-[1px] -translate-x-2  bg-contain mx-auto "
                  src={imgbase64 == undefined ? "/placeholder.png" : imgbase64}
                  alt="nft"
                  width={285}
                  height={280}
                />
              </a>
            </div>

            <div className="-translate-y-[78px] flex flex-col items-center justify-center">
              <p className={cn("text-lg font-pop font-bold mt-3 text-center w-full ")}>
                {data?.at(3)?.result?.slice(0, 15)}
              </p>
              {/* <p className="font-zen text-xl mt-3">{contractAddress?.slice(4, 10)}</p> */}
              <p className="flex font-pop text-lg font-bold w-[90%] justify-center">
                <span className="text-center leading-normal">
                  <span className="text-[17px] font-[600] leading-normal">
                    {deadtime.getUTCDate()}{" "}
                    {deadtime.toLocaleString("default", { month: "short" })}
                    {" - "}
                    {deadtime.getUTCHours()}
                    {":"}
                    {deadtime.getUTCMinutes()} {"utc"}
                  </span>
                </span>
              </p>

              <p>
                {/* <span className="font-pop text-lg font-bold">suplly: </span> */}

                <span className="font-pop text-lg font-semibold mr-3">
                  {data ? ( //@ts-ignore
                    !parseInt(data?.at(1)?.result?.Uint256?.ticketPrice.toString().slice(0, -1)) /
                    10 ** 17 ? (
                      <span>0</span>
                    ) : (
                      //@ts-ignore
                      parseInt(data?.at(1)?.result?.Uint256?.ticketPrice.toString().slice(0, -1)) /
                      10 ** 17
                    )
                  ) : null}
                  <span className="font-pop text-lg font-semibold mr-4">Matic</span>
                </span>
                <span className="font-pop text-lg font-semibold">
                  {//@ts-ignore
                  data?.at(1)?.result?.Uint256?.maximumTicket.toString()}
                  {"/"}
                  {//@ts-ignore
                  data?.at(1)?.result?.Uint256?.soldTickets.toString()}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="-translate-y-[100px] flex flex-col items-center">
          <MyButton
            IWidth={137}
            IHeight={115}
            sm={true}
            className="md:scale-x-[1.2] scale-[1.2]"
            // onClick={handlePopUp}
            // isLoading={ChanceRoomState?.at(0) === "Ticket selling" ? false : true}
            // disable={ChanceRoomState?.at(0) === "Ticket selling" ? false : true}
          >
            <Link
              href={`/Ticket/${contractAddress}`}
              key={"231zasraw2"}
              className={cn(
                "cursor-pointer w-[120px] h-[50px] pb-[4px] flex items-center justify-center font-bold tracking-tight text-2xl ",
                VT323Font.className,
              )}
              scroll={false}
            >
              Mint & Play
            </Link>
          </MyButton>
          <a
            href={`https://polygonscan.com/address/${contractAddress}`}
            target="_blank"
            className="-translate-y-[20px] font-pop text-primary cursor-pointer z-30 text-base font-medium "
          >
            view on Polygonscan
          </a>
        </div>
      </div>
    )
  }
}

export default HomeChanceRoomItem
