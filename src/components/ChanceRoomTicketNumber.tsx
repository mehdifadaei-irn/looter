"use client"
import React, { useEffect, useState } from "react"

import { mainAbi, secondAbiBC3 } from "@/assets/abis/mainAbis"

import { useContractRead, useAccount } from "wagmi"

import Loader2 from "../assets/img/loader-2.svg"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { formatEther } from "viem"
import { Toaster, toast } from "sonner"
import { polygon } from "wagmi/chains"
import { Skeleton } from "@mui/material"

const ChanceRoomTicketNumber = ({
  contractAddress,
  totallSupply,
}: {
  contractAddress: `0x${string}`
  totallSupply: number
}) => {
  const { address: accountAddress } = useAccount()
  const [imgbase64, setImgbase64] = useState<any>()
  const [nftName, setNftName] = useState<any>()

  const { data: balanceOf, isLoading }: { data: any; isLoading: boolean } = useContractRead({
    address: contractAddress,
    abi: secondAbiBC3,
    functionName: "balanceOf",
    args: [accountAddress],
  })

  useEffect(() => {
    if (!accountAddress) {
      toast.error("please connect your wallet to see your chance!")
    }
  }, [])

  const { data: mainD, isLoading: load }: { data: any; isLoading: boolean } = useContractRead({
    //@ts-ignore
    address: contractAddress,
    abi: mainAbi,
    functionName: "tokenURI",
    args: ["0"],
    chainId: polygon.id,
    onSuccess(data) {
      console.log(data, "wat")
      try {
        let parsed = atob(data?.slice(29).toString())
        setImgbase64(JSON?.parse(parsed).image)
        setNftName(JSON?.parse(parsed).name)
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }
    },
  })

  if (isLoading) return <Loader2 className="mr-2 animate-spin scale-120" />

  return (
    <>
      <div className="relative bg-slate-200 rounded-xl border-2 border-primary lg:scale-100 md:scale-90 scale-75">
        <p className="absolute top-0 -right-7 z-20 font-semibold text-xl">
          <div>x{!balanceOf ? "0" : balanceOf?.toString()}</div>
        </p>
        {!load ? (
          <Image
            alt="nft"
            src={imgbase64 == undefined ? "/placeholder.png" : imgbase64}
            width={230}
            height={230}
            className=""
          />
        ) : (
          <Skeleton animation="wave" width={250} height={250} variant="rounded" />
        )}
      </div>
      <p className="font-bold text-3xl my-5">{nftName}</p>
      <div className="bg-[#EDD136] w-[350px] min-h-[6rem] px-2 h-[110px] rounded-3xl border-2 border-black flex justify-center items-center">
        <p className="lg:font-normal font-bold lg:text-[28px] text-[22px] text-center">
          you have{" "}
          {!balanceOf ? "0" : ((parseInt(balanceOf) / totallSupply) * 100).toString().slice(0, 4)}%
          chance to win
        </p>
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}

export default ChanceRoomTicketNumber
