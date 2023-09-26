"use client"
import React from "react"

import { secondAbiBC3 } from "@/assets/abis/mainAbis"

import { useContractRead, useAccount } from "wagmi"

import Loader2 from "../assets/img/loader-2.svg"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { formatEther } from "viem"

const ChanceRoomTicketNumber = ({
  contractAddress,
  totallSupply,
}: {
  contractAddress: `0x${string}`
  totallSupply: number
}) => {
  const { address: accountAddress } = useAccount()
  const { data: balanceOf, isLoading }: { data: any; isLoading: boolean } = useContractRead({
    address: contractAddress,
    abi: secondAbiBC3,
    functionName: "balanceOf",
    args: [accountAddress],
  })

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

  // console.log(1 / totallSupply)

  if (isLoading) return <Loader2 className="mr-2 animate-spin scale-120" />

  // console.log(parseInt(balanceOf))

  return (
    <>
      <div className="relative bg-slate-200 rounded-xl border-2 border-primary">
        <p className="absolute top-2 -right-7 z-20 font-semibold text-xl">
          <div>x{!balanceOf ? "0" : balanceOf?.toString()}</div>
        </p>

        <Image
          alt="nft"
          src={metaData?.normalized_metadata.image}
          width={270}
          height={270}
          priority={true}
        />
      </div>
      <p className="font-normal text-[30px] ">{metaData?.normalized_metadata?.name}</p>
      <div className="bg-[#EDD136] w-[350px] px-2 h-[110px] rounded-3xl border-2 border-black flex justify-center items-center">
        <p className="font-normal text-[28px] text-center">
          you have {((parseInt(balanceOf) / totallSupply) * 100).toString().slice(0, 4)}% chance to
          win
        </p>
      </div>
    </>
  )
}

export default ChanceRoomTicketNumber
