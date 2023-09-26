"use client"
import { VrFABI } from "@/assets/abis/smap"
import { motion, useTime, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { useContractEvent } from "wagmi"

// [
//   {
//     address: '0x3d2341adb2d31f1c5530cdc622016af293177ae0',
//     blockHash:
//       '0xd2e6466326034d41ed483619220c00e2b4d637f3e0681ed1914a98b65c17a8bf',
//     blockNumber: 47979428n,
//     data:
//       '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da74ede4ca0b824aa2af43c6ca00653f79335b8a327888ad1dada714d4e672f9c1000000000000000000000000401c2ae98e1aea385d4f450cbf1348930b1b47bf00000000000000000000000000000000000000000000000000005af3107a4000c1cd820b915c5d78bc8bd77674ed1e0c14db370486fb1a05846dabb1169a0a4a',
//     logIndex: 315,
//     removed: false,
//     topics: [
//       '0x56bd374744a66d531874338def36c906e3a6cf31176eb1e9afd9f1de69725d51', '0x3936613861323666643432363437383438643866666233383764346438333435'
//     ],
//     transactionHash:
//       '0x09401a3dd010f29ace067c6ae5bb05a15425fdccfc447447df9bda343d6ec428',
//     transactionIndex: 80,
//     args: {
//       jobID: '0x3936613861323666643432363437383438643866666233383764346438333435',
//       keyHash:
//         '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da',
//       seed: 52888612235299707191459921500103681710807591126076038221910712031886420670913n,
//       sender: '0x401c2aE98e1AEA385d4F450Cbf1348930b1B47bf',
//       fee: 100000000000000n,
//       requestID:
//         '0xc1cd820b915c5d78bc8bd77674ed1e0c14db370486fb1a05846dabb1169a0a4a'
//     },
//     eventName: 'RandomnessRequest'
//   }
// ]

const page = () => {
  // useContractEvent({
  //   address: "0x3d2341ADb2D31f1c5530cDC622016af293177AE0",
  //   abi: VrFABI,
  //   eventName: "RandomnessRequest",
  //   listener(log) {
  //     console.log("loged")
  //     console.log(log)
  //   },
  // })

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1>Hello</h1>
    </div>
  )
}

export default page
