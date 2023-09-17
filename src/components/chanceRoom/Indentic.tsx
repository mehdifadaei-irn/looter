"use client"
import React from "react"
import { stringToColour } from "@/lib/generateColorFromHash"
//@ts-ignore
import Identicon from "react-identicons"

import { useAccount } from "wagmi"
type IdenticProps = {
  randString: string
  fg?: string
  bg?: string
}

const Indentic = ({ randString, fg, bg }: IdenticProps) => {
  const { address } = useAccount()
  console.log()
  return (
    <div
      className="w-12 h-12 bg-slate-500 rounded-full"
      style={{
        backgroundColor: stringToColour(address ? address?.toString() : "1"),
      }}
    ></div>
  )
}

export default Indentic