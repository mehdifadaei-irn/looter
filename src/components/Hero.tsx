import React from "react"
import Punk2 from "../assets/img/home/punk33.svg"
import Reveal from "./ui/Reveal"
import Image from "next/image"
import TextCarusel from "./TextCarusel"

const Hero = () => {
  return (
    <>
      <Reveal width="100%">
        <main className=" w-full flex flex-col mb-[100px]" id="#top">
          <div className="lg:w-[82%] w-[90%] max-w-[88rem]  xl:w-[85%] mx-auto flex justify-center mt-14">
            <Image
              src={"/home/hero.png"}
              width={1120}
              height={550}
              alt="hero"
              className="translate-x-5 "
            />
          </div>
          <div className="w-[100%] max-w-[88rem] sm:min-h-fit min-h-[47vh]  xl:w-[85%] mx-auto flex justify-center mt-1">
            <Punk2 className="lg:block hidden mr-[6.5%]" />
            <TextCarusel />
          </div>
        </main>
      </Reveal>
      <Reveal width="100%">
        <h3 className="font-pop  xl:font-bold font-semibold xl:text-[72px] lg:text-[60px] md:text-5xl text-4xl w-full text-center mb-4">
          Lottery Project
        </h3>
      </Reveal>
    </>
  )
}

export default Hero
