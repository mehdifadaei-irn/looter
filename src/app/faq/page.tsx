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
import { MyButton } from "@/components/ui/MyButton"

const lonfrina = Londrina_Solid({
  subsets: ["latin"],
  weight: ["400", "300", "100", "900"],
})

const QandA = [
  {
    question: "+ How is the Winner Determined?",
    answer: `The process for determining the winner is as follows : 
    Ticket Generation: By purchasing or receiving a free ticket, you increase your chances in the lottery drawing.
    Chance Room: After the ticket sale concludes, participants access the Chance Room.
    Transparent Drawing: The first person to press the "Spin" button initiates a transparent and verifiable lottery.
    Winner Announcement: The winner is selected from ticket holders (NFTs on Polygon) and automatically receives the original NFT on the Ethereum network.
    With this process, the winner is determined fairly and transparently, and participants can trust the lottery results on the blockchain `,
  },
  {
    question: "+ What Happens If Ticket Sales Do Not Reach the Threshold?",
    answer: "In that case, a refund will be issued.",
  },
  {
    question: "+ When is the Lottery Drawing for Each Project?",
    answer: `The lottery drawing takes place after the completion of ticket sales. The first person among ticket holders who presses the "Spin" button initiates the drawing.`,
  },
  {
    question: "+ Why is Our NFT Lottery Secure and Transparent?",
    answer: `Our NFT Lottery is secure and transparent because:
    \n
    Chainlink VRF: Ensures fair and verifiable random selection.
    Decentralization: Eliminates human or bot intervention.
    Cross-Chain Functionality (CCIP): Enables secure asset transfer between blockchains.
    Public Ledger: Records transactions transparently on the blockchain.
    Smart Contract Automation: Ensures error-free and programmed execution.`,
  },
  {
    question: "+ What is an NFT Lottery? ",
    answer:
      "An NFT Lottery is a type of lottery system that involves Non-Fungible Tokens (NFTs). In our context, it means participants can enter the lottery by locking their NFTs (unique digital assets) to generate tickets. These tickets are then available for purchase, with prices starting at  $1 or more, and sometimes even offered for free. The participants have a chance to win the original NFT hosted on the Ethereum network. The entire process, from ticket creation to the transparent draw and winner announcement, is facilitated in a secure and decentralized manner through smart contracts and innovative technologies like Chainlink's Verifiable Random Function (VRF) and Cross-Chain Communication and Interoperability Protocol (CCIP). This approach ensures fairness, transparency, and the seamless transfer of assets between different blockchains, such as Ethereum and Polygon",
  },
  {
    question: "+ What is ChanceRoooms?  ",
    answer:
      "ChanceRooms is Smart Contract on Polygon Network that run Automatically on different preset rules that any one can join it. This smart contract is not upgradable so the rules are permanents. ChanceRooms is NFT collection that shows the Locked NFT as token id 0 and other id is for who attend to chance room, each attender get and NFT ticket as asset and can be trade or transfer to others. On each ChanceRoom when the condition committed roll up phase is permit and with help of Chain Link VRF winner selected in fair and decentralist way. The Locked NFT will transfer to Winner and other Looser NFTs Tickets can’t refund any more. The fund that collect in Chance Rooms will send to creator of that chance room.",
  },
  {
    question: "+ What is an VRF? ",
    answer:
      "As you know block chian is transparent and any one can involve in validating the blocks. In this manner is not possible to generate a real random number because the miners (validator) can have chance to manipulate the results. So in this case we need to get the random number from some where else, a third party that we called oracle. The duty of this oracle is to generate a Verified Random Number that is not manipulate. Now the best secure oracle that provide this service is Chain Link that we can be sure that the random number that use is really random.",
  },
  {
    question: "+ How to create a ChanceRoom?",
    answer:
      "To create a ChanceRoom, you have two options: mining a new ChanceRoom or purchasing one from the ChanceRoom Factory collection owned by other miners who haven't initialized their ChanceRoom yet. It's crucial to understand that once a ChanceRoom has been initialized, it cannot be initialized again.",
  },
  {
    question: "+ What is word after ChanceRoom?",
    answer:
      "ChanceRooms are different in rules so they have different Name also! So better to read the rules of each Chance room before attend in that.",
  },
]

const Faq = () => {
  return (
    <div className="w-full flex backg h-full overflow-y-auto" style={lonfrina.style}>
      <div className="w-[25%] xl:flex hidden pt-12 pl-4 h-screen">
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
      <div className="flex flex-1 flex-col-reverse relative h-screen ">
        <div className="absolute w-full h-full flex justify-center scale-90">
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
                  {({ open, close }) => (
                    <>
                      <Disclosure.Button
                        // onClick={() => {
                        //   close()
                        // }}
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
        <div className="w-full flex justify-center items-center">
          <MyButton IHeight={90} IWidth={220} type="button" className="mr-5 lg:hidden flex">
            <Link
              href={"/"}
              className="cursor-pointer w-full h-[65px] text-3xl pb-[4px] flex items-center justify-center min-w-[13rem]"
            >
              Home
            </Link>
          </MyButton>
        </div>
      </div>
      {/* main */}
      <div className="w-[25%]  lg:flex hidden flex-col justify-between pt-0">
        <div className="w-full flex justify-end pt-3">
          <MyButton IHeight={90} IWidth={220} type="button" className="mr-5">
            <Link
              href={"/"}
              className="cursor-pointer min-w-[13rem] h-[65px] text-3xl pb-[4px] flex items-center justify-center "
            >
              Home
            </Link>
          </MyButton>
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
