"use client"
import React, { useState } from "react"
import Button from "./Button"
import Image from "next/image"
import { useContractReads } from "wagmi"
import {
  mainAbi,
  secondAbiFB6,
  secondAbi1Bd,
  secondAbi2a2,
  secondAbi3a8,
  secondAbi478,
  secondAbi77D,
  secondAbiBC3,
  secondAbidDe,
} from "@/assets/abis/mainAbis"
import { nftType } from "@/types/nft"
import dynamic from "next/dynamic"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { formatEther } from "viem"
import { polygon } from "wagmi/chains"
import Link from "next/link"
const NoSSRZero = dynamic(() => import("../components/ui/Zero"), { ssr: false })

type ChanceRoomItemProps = {
  contractAddress: `0x${string}` | undefined
  i: number | string
  handleClickOpen: (nft: any) => void
  nft?: any
}

function addressToAbi(index: number | string) {
  if (index == 0) return secondAbiFB6
  if (index == 1) return secondAbiBC3
  if (index == 2) return secondAbi77D
  if (index == 3) return secondAbi2a2
  if (index == 4) return secondAbi478
  if (index == 5) return secondAbidDe
  if (index == 6) return secondAbi3a8
  if (index == 7) return secondAbi1Bd
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
        abi: secondAbiBC3,
        functionName: "status",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "layout",
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "tokenURI",
        args: ["0"],
        chainId: polygon.id,
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "name",
        chainId: polygon.id,
      },
    ],
    onSuccess(data) {
      // console.log(data, "2")
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
    //@ts-ignore
    // console.log(data[1]?.result["Uint256"].maximumTicket)
    //@ts-ignore
    // console.log(data, "met")
    // console.log(metaData, "ts")
    // console.log("loged")
    // console.log(data?.at(0).result.at(0))
  }
  function handlePopUp() {
    handleClickOpen({
      title: metaData.token_address,
      name: data?.at(3).result.slice(0, 15),
      spainDate: `${deadtime.getUTCDate()} ${deadtime.toLocaleString("default", {
        month: "long",
      })} -${deadtime.getUTCHours()}:${deadtime.getUTCMinutes()}:${deadtime.getUTCSeconds()}`,
      totalSuplly: data[1]?.result["Uint256"].maximumTicket.toString(),
      suplly: `${//@ts-ignore
      data[1]?.result["Uint256"].maximumTicket.toString()}${"\\"}${//@ts-ignore
      data[1]?.result["Uint256"].soldTickets.toString()}`,
      price: data //@ts-ignore
        ? !parseInt(data?.at(1)?.result?.Uint256?.ticketPrice.toString().slice(0, -1)) / 10 ** 17
          ? "0"
          : //@ts-ignore
            parseInt(data?.at(1)?.result?.Uint256?.ticketPrice.toString().slice(0, -1)) / 10 ** 17
        : null,
      nftImg: metaData?.normalized_metadata.image,
      contractAddress: contractAddress,
      realPrice:
        parseInt(data?.at(1)?.result?.Uint256?.ticketPrice.toString().slice(0, -1)) / 10 ** 17,
      realPrice1: formatEther(data?.at(1)?.result?.Uint256?.ticketPrice),
    })
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
              <p className="font-bold text-xl opacity-100 z-30 w-full text-center">
                {ChanceRoomState?.at(0)}
              </p>
              <p className="font-bold text-xl opacity-100 z-30  w-full text-center">
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
              <div className="relative w-full h-[20rem] flex items-center justify-center">
                <Image
                  src={"/dumyNft.png"}
                  className="absolute z-0 top-0 bottom-0 right-0 left-0 mx-auto my-auto"
                  alt="Simp"
                  width={360}
                  height={380}
                />
                <Image
                  style={{
                    maxWidth: "none",
                    height: "340px",
                  }}
                  className=" absolute z-10 rounded-[24%] top-[18px] -translate-x-2  bg-contain object-contain mx-auto "
                  src={metaData?.normalized_metadata.image}
                  alt="nft"
                  width={335}
                  height={320}
                />
              </div>
            </div>
            <p className="font-zen text-xl mt-3">{data?.at(3)?.result?.slice(0, 15)}</p>
            {/* <p className="font-zen text-xl mt-3">{contractAddress?.slice(4, 10)}</p> */}
            <p className="flex">
              <span className="font-pop font-bold text-[28px]">Spain date: </span>
              <span className="font-pop font-[500] text-[26px] flex flex-col">
                <span>
                  {deadtime.getUTCDate()}
                  {deadtime.toLocaleString("default", { month: "long" })}
                </span>
              </span>
            </p>
            <p className="font-pop font-normal text-[26px]">
              <span className="w-full text-center">
                {"-"}
                {deadtime.getUTCHours()}
                {":"}
                {deadtime.getUTCMinutes()}
                {":"}
                {deadtime.getUTCSeconds()}
                {"utc"}
              </span>
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
            <p className="mb-2">
              <span className="font-pop font-bold text-[28px]">price:</span>
              <span className="font-pop font-[500] text-[26px]">
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
              </span>
            </p>
          </div>
        )}

        <Button
          scale="0.66"
          // onClick={handlePopUp}
          // isLoading={ChanceRoomState?.at(0) === "Ticket selling" ? false : true}
          // disable={ChanceRoomState?.at(0) === "Ticket selling" ? false : true}
        >
          <Link
            href={`/Ticket/${contractAddress}`}
            key={"231zasraw2"}
            className="cursor-pointer w-full h-[65px] pt-1"
            scroll={false}
          >
            ADD
          </Link>
        </Button>
        <a
          href={`https://polygonscan.com/address/${contractAddress}`}
          target="_blank"
          className=" mt-[60px] text-[13px] text-primary cursor-pointer z-30"
        >
          view on Polygonscan
        </a>
      </div>
    )
  }
}

export default HomeChanceRoomItem
