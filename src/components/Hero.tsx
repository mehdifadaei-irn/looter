import React from "react"
import Ghost from "../assets/img/Ghost.svg"
import Punk1 from "../assets/img/punk1.svg"
import Circle from "../assets/img/circle.svg"
import Punk2 from "../assets/img/home/punk33.svg"
import Button from "./Button"
import Reveal from "./ui/Reveal"
import Link from "next/link"
import { MyButton } from "./ui/MyButton"
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
          <div className="w-full flex justify-center md:mt-3 mt-6">
            <Image
              src={"/home/Lunch.png"}
              width={200}
              height={90}
              alt="Lunch"
              className="hover:scale-x-[1.014] hover:scale-y-[1.008] duration-200 active:scale-[0.98]"
            />
            {/* <MyButton IHeight={90} IWidth={200}>
              <span className="font-pop font-bold text-[26px]">LUNCH</span>
            </MyButton> */}
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
