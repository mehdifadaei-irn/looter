import Image from "next/image"
import React from "react"
import Reveal from "./ui/Reveal"
import { OpenSeaIcon, TwitterIcon } from "./Icons"

const HomeFooter = () => {
  return (
    <Reveal width="100%">
      <div className="w-full relative  font-pop px-12  h-fit">
        <Image src={"/grad.png"} fill alt="bg" className="absolute bottom-0 z-0" />

        <div className="flex z-10 lg:pl-[5%] pl-0">
          <div className="flex flex-col gap-y-6 flex-1 z-10">
            <p className="font-extrabold text-[48px] tracking-wide z-10">
              What is Oracle chain link and why is it secure?
            </p>
            <p className="font-[200] text-[32px] tracking-wide flex flex-col z-10">
              USecurity, without human intervention. Random numbers. The most transparent type of
              lottery. Registration and tracking in the blockchain. A chance to get an expensive
              NFT for only one dollar!
              <span>
                <a className="text-[#7499FF] z-10" href="https://chain.link/cross-chain" target="_blank">
                  more info{" "}
                </a>
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
          </div>
        </div>

        <div className="lg:mt-[9rem] mt-5 flex lg:flex-col flex-row gap-x-3 z-10 pl-[5%] pb-8 gap-y-4">
          <a
            href="https://opensea.io/collection/chanceroom-factory"
            target="_blank"
            className="flex gap-x-5 items-center cursor-pointer z-10  hover:scale-[1.008] duration-200 active:scale-[0.98]"
          >
            <OpenSeaIcon
              width={51}
              height={51}
              className="hover:scale-[1.018] duration-200  active:scale-[0.98]"
            />
            <span>opensea</span>
          </a>
          <a
            href="https://twitter.com/0xlott"
            target="_blank"
            className="flex gap-x-5 items-center cursor-pointer z-10 hover:scale-[1.008] duration-200 active:scale-[0.98]"
          >
            {/* <Image
              src={"/twiblack.png"}
              width={50}
              className="hover:scale-[1.018] duration-200"
              height={50}
              alt="frog"
            /> */}
            <TwitterIcon
              width={47}
              height={47}
              className="hover:scale-[1.018] duration-200 active:scale-[0.98]"
            />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export default HomeFooter
