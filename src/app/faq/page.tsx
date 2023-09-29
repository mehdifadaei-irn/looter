"use client"
import React from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { Londrina_Solid } from "next/font/google"

import GG from "../../assets/img/home/G.svg"
import BlueLine from "../../assets/img/home/blueLinee.svg"
import MM from "../../assets/img/home/M.svg"
import SG from "../../assets/img/home/sG.svg"
import FL from "../../assets/img/home/FL.svg"
import F from "../../assets/img/home/F.svg"
import LL from "../../assets/img/home/LL.svg"
import Orange from "../../assets/img/home/orange.svg"
import Aline from "../../assets/img/home/aline.svg"
import Tah from "../../assets/img/home/tah.svg"
import Lucky from "../../assets/img/home/lucky.svg"

import Flesh from "../../assets/img/home/flesh.svg"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Button"

const lonfrina = Londrina_Solid({
  subsets: ["latin"],
  weight: ["400", "300", "100", "900"],
})

const QandA = [
  {
    question: "+ WHAT BLOCKCHAIN IS IT ON?",
    answer: "The project is developed on the ETH blockchain",
  },
  {
    question: "+ WHAT CAN YOU DO WITH YOUR LOOT ITEM?",
    answer:
      "You can hold it, sell it and trade it. With your spooky, you have access to an amazing 3D football cafe in the Decentraland metaverse!You also can vote and decide what we all are going to do in the DAO!",
  },
  {
    question: "+ WHEN IS THE MINT DATE?",
    answer: "c1",
  },
  {
    question: "+ WHAT IS THE MINT PRICE?",
    answer: "Our Society decided to set the price for WL to  0.009 ETH",
  },
  {
    question: "+ What are horror awards based on? ",
    answer: "c2",
  },
  {
    question: "+ How and when will the winners be determined?  ",
    answer:
      "Your win depends on the performance of your team.  2 days after the end of the World Cup, prizes will be paid based on the global ranking according to the table below.",
  },
  {
    question: "+ Do all items have a chance to win?  ",
    answer:
      "Yes.  All items have a chance to win.  You try your luck by keeping your item until the end of the World Cup.  Or you bet by selling it in the secondary market and buying the desired item which is your favorite team. you can guess :)",
  },
  {
    question: "+ Which accessories are the basis?  ",
    answer:
      "Each item representing a country is accompanied by one of these layers.  Bronze, silver, and golden cup.  And items with balls and beer and placard hand cards have a chance for the losing team to win.",
  },
  {
    question: "+ WHAT BLOCKCHAIN IS IT ON?",
    answer:
      "You can hold it, sell it and trade it. With your spooky, you have access to an amazing 3D football cafe in the Decentraland metaverse!You also can vote and decide for what we all are going to do in the DAO!",
  },
]

const Faq = () => {
  return (
    <div className="w-full flex backg h-full overflow-y-auto" style={lonfrina.style}>
      <div className="w-[25%] 2xl:flex hidden pt-12 pl-4 h-screen">
        <div className="w-[85%] flex flex-col h-full justify-between pb-12">
          <div>
            <div className="flex">
              <GG />
              <MM />
            </div>
            <div className="pl-16 -translate-y-7 ">
              <BlueLine />
            </div>
          </div>
          <div className="flex pl-7">
            <LL />
            <F />
            <FL className="-translate-x-7 translate-y-8" />
            <SG />
          </div>
        </div>
        <div className="w-[15%] flex flex-col justify-center pl-24">
          <Flesh />
          {/* <Orange /> */}
        </div>
      </div>
      {/* main */}
      <div className="flex flex-1 flex-col relative h-screen ">
        <div className="absolute w-full h-full flex justify-center 2xl:items-center scale-90">
          <Image
            src={"/home/vecb.png"}
            width={770}
            height={1400}
            className="absolute "
            alt="vec"
            style={{
              height: "49rem",
            }}
          />
          <Image
            src={"/home/vecy.png"}
            className="absolute translate-y-[3px] -translate-x-[22px] z-20"
            width={730}
            height={9000}
            alt="vec"
            style={{
              height: "49rem",
            }}
          />
        </div>
        <div className="absolute flex z-30 w-full  h-full items-center  flex-col pt-[96px] sm:pr-[88px] pr-[70px]">
          {QandA.map((item, i) => {
            let BgColor = "bg-[#EDD136]"
            if (i == 0) BgColor = "bg-[#EDD136]"
            if (i == 1) BgColor = "bg-[#FED200]"
            if (i == 3) BgColor = "bg-[#F6CD46]"
            if (i == 5) BgColor = "bg-[#F9D157]"
            if (i == 6) BgColor = "bg-[#F6CD46]"
            if (i == 8) BgColor = "bg-[#FED200]"

            return (
              <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-2 " key={i}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full justify-between rounded-lg ${BgColor} px-4 py-2 text-left text-sm font-medium text-[#333333] focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75`}
                      >
                        <span>{item.question}</span>
                        <span className="font-black text-[36px]">{open ? "-" : "+"}</span>
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-4 pt-4 pb-2 bg-transparent text-sm text-zinc-700">
                          {item.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            )
          })}
        </div>
      </div>
      {/* main */}
      <div className="w-[25%]  2xl:flex hidden flex-col justify-between pt-0">
        <div className="w-full flex justify-end pt-3">
          <Button scale="0.8">
            <Link
              href={"/"}
              className="cursor-pointer w-full h-[65px] pb-[4px] flex items-center justify-center"
            >
              Home
            </Link>
          </Button>
        </div>
        <div>
          <div>
            <Aline />
            <Tah className="-translate-y-10 -translate-x-5" />
          </div>
        </div>
        <div className="h-[47%] mb-10">
          <Lucky />
          <p className="text-[120px] tracking-widest font-[300] text-[#F6CD46]">Wagmi</p>
        </div>
      </div>
    </div>
  )
}

export default Faq
