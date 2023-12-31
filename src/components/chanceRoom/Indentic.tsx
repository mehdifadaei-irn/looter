"use client"
import React from "react"
import { stringToColour } from "@/lib/generateColorFromHash"

import { useAccount } from "wagmi"
type IdenticProps = {
  randString: string
  fg?: string
  bg?: string
}

const Indentic = ({ randString, fg, bg }: IdenticProps) => {
  const { address } = useAccount()

  if (!address) {
    return null
  }
  // console.log()
  return (
    <div
      className="w-12 h-12 bg-slate-500 rounded-full md:scale-100 scale-75"
      style={{
        backgroundColor: stringToColour(address ? address?.toString().toLocaleLowerCase() : "1"),
      }}
    ></div>
  )
}

export default Indentic
