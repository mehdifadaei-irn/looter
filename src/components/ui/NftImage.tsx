import { getMetaData } from "@/lib/getMetaData"
import Image from "next/image"
import React from "react"

const NftImage = async ({ contractAddress }: { contractAddress: `0x${string}` | undefined }) => {
  const data = await getMetaData(contractAddress)
  console.log(data)
  return (
    // <p>helo</p>
    <Image
      style={{
        maxWidth: "none",
        height: "340px",
      }}
      className=" absolute z-10 rounded-[24%] top-[1px] -translate-x-2  bg-contain mx-auto "
      src={data?.normalized_metadata.image}
      alt="nft"
      width={335}
      height={320}
    />
  )
}

export default NftImage
