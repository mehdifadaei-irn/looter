import { Skeleton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { Suspense } from "react"

async function getData(contractAddress: string) {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/0?chain=polygon&format=decimal&normalizeMetadata=true&media_items=false`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
      },
    },
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const ChanseRoomName = async ({ contractAddress }: { contractAddress: string }) => {
  const data1 = await getData(contractAddress)

  function loff9() {
    console.log(data1)
  }

  // console.log(data1)

  return (
    <div className="flex flex-col justify-start items-center w-[98%]  -translate-y-5">
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <Skeleton animation="wave" width={700} variant="text" sx={{ fontSize: "25px" }} />
          </div>
        }
      >
        <p className="xl:font-bold md:font-medium font-normal sm:flex hidden  xl:text-[25px] md:text-[21px] text-[19px] xl:pt-0 pt-2 text-center ">
          {data1?.name}
        </p>
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <Skeleton animation="wave" width={200} variant="text" sx={{ fontSize: "25px" }} />
          </div>
        }
      >
        <p className="xl:font-bold sm:font-medium font-bold  xl:text-[22px] sm:text-[17px] text-[20px] xl:pt-0 sm:pt-2 pt-8 text-center ">
          {data1?.normalized_metadata.name}
        </p>
      </Suspense>
    </div>
  )
}

export default ChanseRoomName
