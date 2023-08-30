import Image from "next/image"
import React from "react"
import Reveal from "./ui/Reveal"

const HomeFooter = () => {
  return (
    <Reveal width="100%">
      <div className="w-full mt-[10rem] font-pop px-12 bagrad">
        <div className="flex">
          <div className="flex flex-col gap-y-6 flex-1">
            <p className="font-extrabold text-[48px] tracking-wide">
              What is Oracle chain link and why is it secure?
            </p>
            <p className="font-[200] text-[32px] tracking-wide flex flex-col">
              USecurity, without human intervention. Random numbers. The most transparent type of
              lottery. Registration and tracking in the blockchain. A chance to get an expensive
              NFT for only one dollar!
              <span>
                <span className="text-[#7499FF]">more info </span>
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

        <div className="mt-[9rem]">
          <div className="flex gap-x-5 items-center">
            <Image
              src={"/opensea.png"}
              width={50}
              // className="absolute -top-14 -left-4"
              height={50}
              alt="frog"
            />
            <span>opensea</span>
          </div>
          <div className="flex gap-x-5 items-center">
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
