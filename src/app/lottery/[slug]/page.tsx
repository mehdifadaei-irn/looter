import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import Spinner from "@/components/ui/Spinner"
import Table from "../../../assets/img/home/table.svg"
import Settel from "../../../assets/img/home/sett.svg"
import Address from "@/components/ui/Address"

type lotteryProps = {
  params: {
    slug: string
  }
}

const page = ({ params: { slug } }: lotteryProps) => {
  return (
    <div className="w-full h-screen relative overflow-y-hidden ">
      <div className="w-full bg-[#B1C5FB] absolute z-0 h-screen " />
      <div className="backlottery  absolute w-full z-10 h-screen top-0 right-0 bottom-0 left-0">
        {/* Nav */}
        <nav className="flex justify-between w-full pt-10 px-8">
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <div className="mb-12 ml-9">
              <Button fontW="text-[20px]" scale="1.1" styless="">
                Mint more ticket
              </Button>
            </div>
            <Button styless="mb-10 mt-5 ml-9" scale="1">
              Sound off
            </Button>
            <Button styless="mb-10 mt-5 ml-9" scale="0.9">
              <Link href={"/"}>BACK</Link>
            </Button>
          </div>
          <div className="flex flex-col text-center justify-center items-center -translate-y-10">
            <p className="font-bold text-[32px]">
              Chans Room: <span>Lil Nouns</span>
            </p>
            <p className="font-bold text-[32px]">#1456</p>
          </div>
          <div className="flex gap-x-2">
            <div>
              <Image
                src={"/eyes.png"}
                className=" mr-2"
                width={60}
                height={50}
                alt="Eyes"
              />
            </div>
            <div>
              <Image
                src={"/acc.png"}
                className="pt-"
                width={50}
                height={50}
                alt="acc"
              />
            </div>
            <Address />
          </div>
        </nav>

        <div className="w-full flex h-[70%]">
          <div className=" flex flex-col w-[30%] justify-end pl-14 ">
            <div className="relative 2xl:block hidden h-[40%]">
              <Image
                src={"/frog.png"}
                width={150}
                className="absolute bottom-[88%]"
                height={150}
                alt="frog"
              />
              <Table className="absolute " />
            </div>
          </div>
          <Spinner />

          <div className="flex flex-col text-center justify-end  w-[30%] pb-14">
            <span>winner</span>
            <span>0x231f214123a23</span>
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
        </div>
      </div>
    </div>
  )
}

export default page
