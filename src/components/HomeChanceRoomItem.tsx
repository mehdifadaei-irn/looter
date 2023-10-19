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
import NftImage from "./ui/NftImage"
import { VT323 } from "next/font/google"
import { cn } from "@/lib/utils"

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
  React.useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true)
  }, [])

  const { data: metaData }: { data: any } = useQuery({
    queryKey: ["getMetadata", `${contractAddress}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/0?chain=polygon&format=decimal&normalizeMetadata=true&media_items=false`,
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
    ],
    onSuccess(data) {
      console.log(data, "2")
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
    console.log(metaData)
  }

  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return null
  } else {
    const date = new Date()
    return (
      <div key={i} className=" w-[23rem] flex flex-col items-center relative">
        <div className="w-full flex justify-center items-center h-full absolute -top-[10%] bottom-0 right-0 left-0 flex-col gap-y-3">
          {ChanceRoomState?.at(0) === "Ticket selling" ? null : (
            <div className="w-[70%] z-30 pb-8">
              <p
                className={cn(
                  "font-bold text-4xl opacity-100 z-30  w-full text-center",
                  VT323Font.className,
                )}
              >
                {ChanceRoomState?.at(0)}
              </p>
              <p
                className={cn(
                  "font-bold text-4xl opacity-100 z-30  w-full text-center",
                  VT323Font.className,
                )}
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
            <div className="w-full flex items-center justify-center ">
              <div className="relative w-full h-[364px] flex items-center justify-center">
                <Image
                  src={"/dumyNft.png"}
                  className="absolute z-0 top-[2px] bottom-0 right-0 left-0 mx-auto my-auto"
                  alt="Simp"
                  width={360}
                  height={380}
                />
                <Image
                  style={{
                    maxWidth: "none",
                    height: "340px",
                  }}
                  className=" absolute z-10 rounded-[24%] top-[1px] -translate-x-2  bg-contain mx-auto "
                  src={
                    metaData?.normalized_metadata.image.toString().slice(0, 4) == "http"
                      ? "https://ipfs.io/ipfs/QmT37EzSmQSUV1iMxxBBmG5T3WAt15rfPZvQfajEhsVATF/pfp0_5566.png"
                      : metaData?.normalized_metadata.image
                  }
                  alt="nft"
                  width={335}
                  height={320}
                />
                {/* <NftImage contractAddress={contractAddress}/> */}
              </div>
            </div>
            <p className={cn("text-4xl mt-3", VT323Font.className)}>
              {data?.at(3)?.result?.slice(0, 15)}
            </p>
            {/* <p className="font-zen text-xl mt-3">{contractAddress?.slice(4, 10)}</p> */}
            <p className="flex">
              <span className="font-pop font-bold text-[25px]">Spain date: </span>
              <span className="font-pop font-[500] text-[26px] flex flex-col">
                <span>
                  {deadtime.getUTCDate()}
                  {deadtime.toLocaleString("default", { month: "short" })}
                </span>
              </span>
              <p className="font-pop font-normal text-[26px]">
                <span className="w-full text-center">
                  {" - "}
                  {deadtime.getUTCHours()}
                  {":"}
                  {deadtime.getUTCMinutes()} {"utc"}
                </span>
              </p>
            </p>

            <p>
              <span className="font-pop font-bold text-[28px]">suplly: </span>
              <span className="font-pop font-[500] text-[26px]">
                {//@ts-ignore
                data?.at(1)?.result?.Uint256?.maximumTicket.toString()}
                {"/"}
                {//@ts-ignore
                data?.at(1)?.result?.Uint256?.soldTickets.toString()}
              </span>
            </p>
            <p className="mb-2 flex">
              <span className="font-pop font-bold text-[28px]">price:</span>
              <span className="font-pop font-[500] text-[26px] flex">
                {/* @ts-ignore */}
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
                <span className="font-pop font-normal text-[26px]">Matic</span>
                <Image
                  src={"/home/Matic.png"}
                  alt="matic"
                  width={35}
                  height={35}
                  className="ml-5"
                />
              </span>
            </p>
          </div>
        )}

        <MyButton
          // scale="0.66"
          IWidth={100}
          IHeight={90}
          sm={true}
          // onClick={handlePopUp}
          // isLoading={ChanceRoomState?.at(0) === "Ticket selling" ? false : true}
          // disable={ChanceRoomState?.at(0) === "Ticket selling" ? false : true}
        >
          <Link
            href={`/Ticket/${contractAddress}`}
            key={"231zasraw2"}
            className={cn(
              "cursor-pointer w-[100px] h-[50px] pb-[4px] flex items-center justify-center font-bold text-3xl ",
              VT323Font.className,
            )}
            scroll={false}
          >
            ADD
          </Link>
        </MyButton>
        <a
          href={`https://polygonscan.com/address/${contractAddress}`}
          target="_blank"
          className=" mt-[20px] text-[13px] text-primary cursor-pointer z-30"
        >
          view on Polygonscan
        </a>
      </div>
    )
  }
}

export default HomeChanceRoomItem
