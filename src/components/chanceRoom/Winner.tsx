"use client"
import React from "react"
import { useSelector } from "react-redux"

import Settel from "../../assets/img/home/sett.svg"

const Winner = () => {
  //@ts-ignore
  const { Winner, addressOfContract } = useSelector((state) => state.winner)
  if (Winner == "") return null
  return (
    <div className="flex flex-col text-center justify-end  w-[30%] pb-14">
      <span>winner</span>
      <span className="underline">
        {Winner.slice(0, 5)}...{Winner.slice(39, 42)}
      </span>
      <span>congrats!</span>
      <div className="flex text-center w-full justify-center">
        <div className="flex flex-col">
          <span>owner item #32</span>
          <span>you can settel</span>
        </div>
        <Settel />
      </div>
      <span>and recieve you NFT prize.</span>
      <span className="text-[#2862FF] underline">etherscan link</span>
      <span className="text-[#2862FF] underline">contract address</span>
    </div>
  )
}

export default Winner
// {Winner && (
//   <div className="flex flex-col text-center justify-end  w-[30%] pb-14">
//     <span>winner</span>
//     <span>{Winner}</span>
//     <span>congrats!</span>
//     <div className="flex text-center w-full justify-center">
//       <div className="flex flex-col">
//         <span>owner item #32</span>
//         <span>you can settel</span>
//       </div>
//       <Settel />
//     </div>
//     <span>and recieve you NFT prize.</span>
//     <span className="text-[#2862FF] underline">etherscan link</span>
//     <span className="text-[#2862FF] underline">contract address</span>
//   </div>
// )}
