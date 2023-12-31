import React from "react"
import BlueLine from "../assets/img/blueLink.svg"
import Reveal from "./ui/Reveal"
import Mo from "../assets/img/mo.svg"
import MoSaye from "../assets/img/mo1.svg"
import Rocket from "../assets/img/rocket.svg"
import Ga from "../assets/img/gA.svg"
import Ba from "../assets/img/bA.svg"
import Wa from "../assets/img/wA.svg"
import Eyes from "../assets/img/eyes2.svg"
import Image from "next/image"
import Link from "next/link"

const SocialLink = () => {
  return (
    <Reveal width="100%">
      <div className="font-pop w-[100%] max-w-[83rem]  xl:w-[85%] mx-auto flex flex-col items-center my-14">
        <div>
          <h3 className="font-extrabold text-[40px] tracking-wider">Class Links</h3>
          <BlueLine className="-translate-y-4 scale-75" />
        </div>
        <div className="grid px-11 w-full grid-rows-6 gap-y-11 justify-center justify-items-center grid-cols-1 md:grid-rows-3 md:grid-cols-2">
          <Link
            href="https://twitter.com/0xlott"
            target="_blank"
            className="bg-amber-300 relative xl:w-[75%] w-[78%] flex items-center justify-center rounded-[50px] py-6 border border-black"
          >
            <Rocket
              width={100}
              className="absolute w-[70px] h-[70px] -left-5 -top-3 right-0 bottom-0"
            />
            {/* <Image src={""} */}
            <span className="font-bold text-2xl text-slate-900 tracking-wider">Twitter</span>
          </Link>
          <Link
            href="https://discord.gg/HRKc6KYk"
            target="_blank"
            className="bg-amber-300 relative xl:w-[75%] w-[78%] flex items-center justify-center rounded-[50px] py-6 border border-black"
          >
            <span className="font-bold text-2xl text-slate-900 tracking-wider">Discord</span>
            <div className="absolute right-10 -top-7">
              <Mo className="scale-75 absolute translate-x-[2px] translate-y-[2px]" />
              <MoSaye className="scale-75 absolute" />
            </div>
          </Link>
          <Link
            href="https://polygonscan.com/address/0x000004911bede2053923baf3b59e1a9f034482c9#readProxyContract"
            target="_blank"
            className="bg-amber-300 relative xl:w-[75%] w-[78%] flex items-center justify-center rounded-[50px] py-6 border border-black"
          >
            <Image
              src={"/done.png"}
              width={69}
              height={69}
              alt="done"
              className="absolute -left-5 -top-3"
            />
            <span className="font-bold text-2xl text-slate-900 tracking-wider">Contract</span>
            <div>
              <Wa className="absolute z-10 -top-7 -right-12" />
              <Ba className="absolute z-20 -top-5 -right-10" />
              <Ga className="absolute z-30 -top-5 -right-10" />
            </div>
          </Link>
          <a className="bg-amber-300 relative xl:w-[75%] w-[78%] flex items-center justify-center rounded-[50px] py-6 border border-black">
            <span className="font-bold text-2xl text-slate-900 tracking-wider">Apply project</span>
            <Image
              src={"/eyes.png"}
              width={75}
              height={75}
              alt="done"
              className="absolute -right-5 -top-3"
            />
          </a>
          <Link
            href="https://chain.link/"
            target="_blank"
            className="bg-amber-300 relative xl:w-[75%] w-[78%] flex items-center justify-center rounded-[50px] py-6 border border-black"
          >
            <Image
              src={"/chain.png"}
              width={63}
              height={63}
              alt="done"
              className="absolute -left-5 -top-3"
            />
            <span className="font-bold text-2xl text-slate-900 tracking-wider">Chain Link</span>
          </Link>
          <Link
            href={"/faq"}
            className="bg-amber-300 cursor-pointer relative xl:w-[70%] w-[78%] flex items-center justify-center rounded-[50px] py-7 border border-black"
          >
            <Image
              src={"/faq.png"}
              width={65}
              height={65}
              alt="done"
              className="absolute -right-5 -top-3"
            />
            <span className="font-bold text-2xl text-slate-900 tracking-wider">FAQ</span>
          </Link>
        </div>
        {/* <a href="#top" className="underline text-lg font-medium mt-12">
          BACK TO TOP
        </a> */}
      </div>
    </Reveal>
  )
}

export default SocialLink
