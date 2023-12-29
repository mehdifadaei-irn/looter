"use client"
import { VrFABI } from "@/assets/abis/smap"
import React from "react"
import { toast } from "sonner"
import { useContractEvent } from "wagmi"

const page = () => {
  useContractEvent({
    address: "0x3d2341ADb2D31f1c5530cDC622016af293177AE0",
    abi: VrFABI,
    eventName: "RandomnessRequestFulfilled",
    listener(log: any) {
      console.log(log[0]?.args?.requestId, "e")
      toast("nice")
    },
  })
  return (
    <div className="w-full h-screen">
      <h1>hello</h1>
    </div>
  )
}

export default page
