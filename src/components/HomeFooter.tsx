import Image from "next/image"
import React from "react"
import Reveal from "./ui/Reveal"

const HomeFooter = () => {
  return (
    <Reveal width="100%">
      <div className="w-full relative  font-pop px-12  h-fit">
        <Image src={"/grad.png"} fill alt="bg" className="absolute bottom-0 z-0" />

        <div className="flex z-10 pl-[5%]">
          <div className="flex flex-col gap-y-6 flex-1 z-10">
            <p className="font-extrabold text-[48px] tracking-wide z-10">
              What is Oracle chain link and why is it secure?
            </p>
            <p className="font-[200] text-[32px] tracking-wide flex flex-col z-10">
              USecurity, without human intervention. Random numbers. The most transparent type of
              lottery. Registration and tracking in the blockchain. A chance to get an expensive
              NFT for only one dollar!
              <span>
                <span className="text-[#7499FF] z-10">more info </span>
                for chain link and smart contracts.
              </span>
            </p>
          </div>

          <div className="lg:flex flex-col gap-y-6 w-[50%] items-center hidden">
            <Image
              src={"/seke.png"}
              width={800}
              className="-translate-x-20"
              height={470}
              alt="frog"
            />
            <Image
              src={"/zan.png"}
              width={300}
              // className="absolute -top-14 -left-4"
              height={350}
              alt="frog"
            />
          </div>
        </div>

        <div className="lg:mt-[9rem] mt-5 flex lg:flex-col flex-row gap-x-3 z-10 pl-[5%]">
          <div className="flex gap-x-5 items-center z-10">
            <Image
              src={"/opensea.png"}
              width={50}
              // className="absolute -top-14 -left-4"
              height={50}
              alt="frog"
            />
            <span>opensea</span>
          </div>
          <div className="flex gap-x-5 items-center z-10">
            <Image
              src={"/twiblack.png"}
              width={50}
              // className="absolute -top-14 -left-4"
              height={50}
              alt="frog"
            />
            <span>Twitter</span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default HomeFooter
