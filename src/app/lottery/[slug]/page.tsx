import Image from "next/image"
import React, { useMemo, useState } from "react"

import Spinner from "@/components/chanceRoom/Spinner"

import Address from "@/components/ui/Address"

import Indentic from "@/components/chanceRoom/Indentic"
import ChanseRoomName from "@/components/chanceRoom/ChanseRoomName"
import Sound from "@/components/chanceRoom/Sound"
import Winner from "@/components/chanceRoom/Winner"
import { MyButton } from "@/components/ui/MyButton"
import RandomImage from "@/components/chanceRoom/RandomImage"
import { Toaster } from "sonner"

type lotteryProps = {
  params: {
    slug: `0x${string}`
  }
}

const page = ({ params: { slug } }: lotteryProps) => {
  return (
    <div className="w-full min-h-[100vh] relative overflow-hidden ">
      <div className="w-full bg-[#B1C5FB] absolute z-0 h-screen " />
      <div className="backlottery  absolute w-full z-10  top-0 right-0 bottom-0 left-0 xl:!bg-cover !bg-auto ">
        {/* Nav */}
        <nav className="flex justify-between w-full xl:pt-8 pt-6 h-[25%] ms:mx-5">
          <div className="flex flex-col lg:gap-y-7 gap-y-3 items-center lg:justify-center lg:pt-0 lg:w-fit w-[8rem] pl-7">
            <MyButton IHeight={100} IWidth={240} type="button" className="mb-2 lg:flex hidden">
              <a
                href={`/Ticket/${slug}`}
                className="w-[220px] h-[70px] flex justify-center items-center font-semibold text-2xl "
              >
                Mint more ticket
              </a>
            </MyButton>
            <a
              href={`/Ticket/${slug}`}
              className="w-[50px] p-2 h-[55px] bg-yellow-100 rounded-full lg:hidden flex justify-center items-center border-slate-900 border-[3px] "
            >
              Mint
            </a>
            <Sound contractAddress={slug} />
            <MyButton IHeight={80} IWidth={200} type="button" className="mt-2 lg:flex hidden">
              <a
                href={"/"}
                className="cursor-pointer w-[220px] h-[70px] flex justify-center items-center font-semibold text-2xl "
              >
                BACK
              </a>
            </MyButton>
            <a
              href={"/"}
              className="w-[50px] z-50 p-2 h-[55px] bg-yellow-100 rounded-full lg:hidden flex justify-center items-center border-slate-900 border-[3px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 14 4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
              </svg>
            </a>
          </div>
          <div className=" w-full flex justify-center">
            <ChanseRoomName contractAddress={slug} />
          </div>
          <div className="flex sm:gap-x-2 md:mr-7 mr-3 2xl:min-w-[14rem] lg:min-w-[11rem] md:min-w-[10rem] w-fit">
            <div className="2xl:block hidden">
              <Image src={"/eyes.png"} className="" width={110} height={80} alt="Eyes" />
            </div>
            <div className="xl:pr-0">
              <Indentic randString={slug} />

              {/* <Image src={"/acc.png"} className="pt-" width={50} height={50} alt="acc" /> */}
            </div>
            <div className="w-full pt-1 h-[24%] justify-center items-center sm:flex hidden ">
              <Address />
            </div>
          </div>
        </nav>

        <div className="w-full flex h-[75%] md:justify-start justify-end ">
          {/*  */}
          <RandomImage />
          {/* <div className="flex-col w-[25%] justify-end pl-24  pb-4 sm:flex hidden ">
            <Image
              src={"/11.avif"}
              width={330}
              className="xl:block hidden"
              height={330}
              alt="frog"
            />
          </div> */}
          {/*  */}
          <Spinner contractAddress={slug} />
          {/* <button onClick={logg}>clogg</button> */}
          <Winner />
        </div>
      </div>
      <Toaster position="top-center" richColors expand={true} />
    </div>
  )
}

export default page
