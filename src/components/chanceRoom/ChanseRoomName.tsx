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
  // const { data: metaData, isLoading }: { data: any; isLoading: boolean } = useQuery({
  //   queryKey: ["getMetadata", `${contractAddress}`],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/0?chain=polygon&format=decimal&normalizeMetadata=true&media_items=false`,
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
  //         },
  //       },
  //     )

  //     return data
  //   },
  // })

  const data1 = await getData(contractAddress)

  function loff9() {
    console.log(data1)
  }

  console.log(data1)

  return (
    <div className="flex flex-col text-center justify-start items-center w-[42%]">
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <Skeleton animation="wave" width={700} variant="text" sx={{ fontSize: "25px" }} />
          </div>
        }
      >
        <p className="xl:font-bold font-medium  xl:text-[25px] text-[21px] xl:pt-0 pt-2 ">
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
        <p className="xl:font-semibold font-medium  xl:text-[21px] text-[17px] xl:pt-0 pt-2 ">
          {data1?.normalized_metadata.name}
        </p>
      </Suspense>
    </div>
  )
}

export default ChanseRoomName
