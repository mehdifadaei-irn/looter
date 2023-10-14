import React from "react"
import Ghost from "../assets/img/Ghost.svg"
import Punk1 from "../assets/img/punk1.svg"
import Circle from "../assets/img/circle.svg"
import Punk2 from "../assets/img/punk3.svg"
import Button from "./Button"
import Reveal from "./ui/Reveal"
import Link from "next/link"
import { MyButton } from "./ui/MyButton"

const Hero = () => {
  return (
    <>
      <Reveal width="100%">
        <main className=" w-full flex flex-col mb-[100px]" id="#top">
          <div className="w-full flex justify-center ">
            <div className="flex lg:justify-between justify-center lg:mt-2 mt-0 w-[85%] max-w-[88rem]  xl:w-[72%]">
              <Ghost className="scale-125 hidden lg:block" />
              <div className="md:w-[50%] sm:w-[64%] w-[86%] lg:w-[52%] font-pop">
                <p className=" md:font-bold font-semibold md:text-[70px] sm:text-[60px] text-[55px] flex flex-col text-center">
                  <span className="">Lootery</span>
                  <span className="flex lg:gap-x-4 xl:pl-[17%] w-full ">
                    <span className="text-[#F24C00] ">NFT</span>
                    <span className="relative -translate-y-2">
                      <span className=" absolute left-9 z-30">polygon</span>
                      <Circle className=" lg:scale-[1] scale-[0.9] z-0  absolute lg:left-6 left-4" />
                    </span>
                  </span>
                  <span>decentralize</span>
                </p>
              </div>
              <Punk1 className="mt-10 hidden lg:block" />
            </div>
          </div>

          <div className="w-[85%] max-w-[88rem]  xl:w-[72%] mx-auto flex xl:justify-start justify-center">
            <Punk2 className="lg:block hidden mr-[6.5%]" />
            <p className="xl:w-[54%] md:w-[70%] w-[99%] lg:mt-3 flex flex-col text-center font-normal text-[28px] font-pop">
              <span>SANG LOTTERY:</span>A fixed and limited number of tickets will be sold to draw
              an NFT. Organizer will set the number of tickets, their price, and the deadline of
              the Sang Lottery at the beginning when She/He locks the price NFT in deployed SANG
              LOTTERY contract. If all the tickets have been sold before the deadline: Organizer
              can draw the winner, The NFT, and the organizer's money will transfer automatically.
            </p>
          </div>
          <div className="w-full flex justify-center mt-5">
            <MyButton IHeight={90} IWidth={200}>
              <span className="font-pop font-bold text-[26px]">LUNCH</span>
            </MyButton>
          </div>
        </main>
      </Reveal>
      <Reveal width="100%">
        <h3 className="font-pop  md:font-bold font-semibold md:text-[72px] text-[62px] w-full text-center mb-4">
          Lottery project
        </h3>
      </Reveal>
    </>
  )
}

export default Hero
