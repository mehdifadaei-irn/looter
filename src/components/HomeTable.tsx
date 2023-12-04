import Image from "next/image"
import React from "react"
import Week from "../assets/img/week.svg"
import Reveal from "./ui/Reveal"

type tableDataType = {
  name: string
  project: string
  supplyticker: string
  process: string
  situation: string
  winner: string
}

const tableData: tableDataType[] = [
  {
    name: "sang#1",
    project: "lilnouns #7356",
    supplyticker: "50",
    process: "sold Out",
    situation: "excute",
    winner: "0X54...32a",
  },
  {
    name: "sang#2",
    project: "mfers #4320",
    supplyticker: "70",
    process: "MINTING",
    situation: "19 MAY ",
    winner: "?",
  },
  {
    name: "sikh 1",
    project: "punk #5498",
    supplyticker: "100",
    process: "refound",
    situation: "canceled",
    winner: "-",
  },
  {
    name: "sikh 2",
    project: "English",
    supplyticker: "Eng",
    process: "",
    situation: "",
    winner: "?",
  },
  {
    name: "chob 1",
    project: "Lunch",
    supplyticker: "",
    process: "",
    situation: "",
    winner: "?",
  },
]

const tableDataBlue: tableDataType[] = [
  {
    name: "",
    project: "",
    supplyticker: "",
    process: "",
    situation: "",
    winner: "?",
  },
  {
    name: "",
    project: "",
    supplyticker: "",
    process: "",
    situation: "",
    winner: "?",
  },
  {
    name: "",
    project: "",
    supplyticker: "",
    process: "",
    situation: "",
    winner: "?",
  },
]

const HomeTable = () => {
  return (
    <Reveal width="100%">
      <div className="font-pop my-10 w-full flex flex-col mt-28">
        <div className="relative w-full flex items-center justify-center">
          <Week className="md:scale-95 absolute scale-[0.8]" />
          <p className="absolute z-10 font-semibold text-white tracking-widest text-2xl">
            Weakly Schedule
          </p>
        </div>
        {/* Table  */}
        <div className="w-full flex justify-end translate-y-20 xl:pr-36 lg:pr-28 pr-14">
          <Image src={"/orange.png"} width={60} height={60} alt="frog" />
        </div>
        <div className="w-full lg:px-12 px-0 flex flex-col flex-1">
          {/* head */}
          <div className="mt-24 w-full grid-cont justify-center">
            <div className="justify-center relative w-[120px] flex">
              <Image
                src={"/frog.png"}
                width={150}
                className="absolute -top-14 -left-4 hidden lg:flex"
                height={150}
                alt="frog"
              />
            </div>
            <div className="flex bg-[#28c878] text-white font-medium py-2 text-[25px] justify-center border border-black">
              <p>project</p>
            </div>
            <div className="flex bg-[#28c878] text-white font-medium py-2 text-[25px] justify-center border border-black">
              <p>suplly Ticket</p>
            </div>
            <div className="flex bg-[#28c878] text-white font-medium py-2 text-[25px] justify-center border border-black">
              <p>proces</p>
            </div>
            <div className="flex bg-[#28c878] text-white font-medium py-2 text-[25px] justify-center border border-black">
              <p>situation</p>
            </div>
            <div className="flex bg-[#28c878] text-white font-medium py-2 text-[25px] justify-center border border-black">
              <p>winner</p>
            </div>
          </div>
          {/* 1 */}
          <div className="w-full grid-cont justify-center">
            {tableData.map((item, i) => (
              <>
                <div className="flex bg-[#f6cd46] text-white font-medium py-2 text-[25px] justify-center border border-black">
                  <p className="text-center">{item.name}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p className="text-center">{item.project}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p className="text-center"> {item.supplyticker}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p className="text-center">{item.process}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p className="text-center">{item.situation}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  {item.winner.includes("0") ? (
                    <p className="text-center underline text-blue-300 cursor-pointer">
                      {item.winner}
                    </p>
                  ) : (
                    <p className="text-center">{item.winner}</p>
                  )}
                </div>
              </>
            ))}
            {tableDataBlue.map((item, i) => (
              <>
                <div className="flex bg-[#829cff] text-white font-medium py-2 text-[25px] justify-center border border-black">
                  <p>{item.name}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p>{item.project}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p>{item.supplyticker}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p>{item.process}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p>{item.situation}</p>
                </div>
                <div className="flex bg-white text-black font-medium py-2 text-[25px] justify-center border border-black">
                  <p>{item.winner}</p>
                </div>
              </>
            ))}
          </div>
          <a href="#top" className="underline text-lg font-medium mt-28 w-full text-center">
            BACK TO TOP
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export default HomeTable
