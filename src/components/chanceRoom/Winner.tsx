"use client"
import React from "react"
import { useSelector } from "react-redux"

import Settel from "../../assets/img/home/sett.svg"

const Winner = () => {
  //@ts-ignore
  const { Winner, addressOfContract } = useSelector((state) => state.winner)
  if (Winner == "") return null
  return (
    <div className="flex flex-col text-center justify-end  sm:w-[25%] w-[34%] pb-14 z-50">
      <span>winner</span>
      <a href={`https://polygonscan.com/address/${Winner}`} target="_blank" className="underline">
        {Winner.slice(0, 5)}...{Winner.slice(39, 42)}
      </a>
      <span>congrats!</span>
      <div className="flex text-center w-full justify-center">
        <div className="flex flex-col">
          <span>owner item #32</span>
          <span>you can settel</span>
        </div>
        <Settel />
      </div>
      <span>and recieve you NFT prize.</span>
      <a
        className="text-[#2862FF] underline"
        href={`https://polygonscan.com/address/0x00000783facddb2593dafdf596f7962d506d31bd`}
        target="_blank"
      >
        polygscan Factory link
      </a>
      <a
        href={`https://polygonscan.com/address/${addressOfContract}`}
        target="_blank"
        className="text-[#2862FF] underline"
      >
        contract address
      </a>
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
