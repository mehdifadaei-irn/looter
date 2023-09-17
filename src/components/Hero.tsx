import React from "react"
import Ghost from "../assets/img/Ghost.svg"
import Punk1 from "../assets/img/punk1.svg"
import Circle from "../assets/img/circle.svg"
import Punk2 from "../assets/img/punk3.svg"
import Button from "./Button"
import Reveal from "./ui/Reveal"

const Hero = () => {
  return (
    <>
      <Reveal width="100%">
        <main className=" w-full flex flex-col mb-[100px]" id="#top">
          <div className="w-full flex justify-center ">
            <div className="flex lg:justify-between justify-center lg:mt-14 mt-8 w-[92%]  xl:w-[82%]">
              <Ghost className="scale-125 hidden lg:block" />
              <div className="md:w-[50%] lg:w-[52%]  font-pop">
                <p className=" font-bold text-[70px] flex flex-col text-center">
                  <span className="text-[70px]">Lootery</span>
                  <span className="flex gap-x-4 xl:ml-9 ml-3">
                    <span className="text-[#F24C00]">NFT</span>
                    <span className="relative">
                      <span className=" absolute left-3">polygon</span>
                      <Circle className=" lg:scale-[1.4] scale-[1.2]  absolute lg:left-9 left-4" />
                    </span>
                  </span>
                  <span>decentralize</span>
                </p>
              </div>
              <Punk1 className="mt-10 hidden lg:block" />
            </div>
          </div>

          <div className="xl:w-[84%] mx-auto w-[99%] flex xl:justify-start justify-center">
            <Punk2 className="lg:block hidden mr-[6.5%]" />
            <p className="xl:w-[54%] md:w-[65%] w-[70%] mt-7 flex flex-col text-center font-normal text-[28px] font-pop">
              <span>SANG LOTTERY:</span>A fixed and limited number of tickets will be sold to draw
              an NFT. Organizer will set the number of tickets, their price, and the deadline of
              the Sang Lottery at the beginning when She/He locks the price NFT in deployed SANG
              LOTTERY contract. If all the tickets have been sold before the deadline: Organizer
              can draw the winner, The NFT, and the organizer's money will transfer automatically.
            </p>
          </div>
          <div className="w-full flex justify-center mt-7">
            <Button fontW="font-extrabold">LUNCH</Button>
          </div>
        </main>
      </Reveal>
      <Reveal width="100%">
        <h3 className="font-pop  font-bold text-[72px] w-full text-center mb-4">
          Lottery project
        </h3>
      </Reveal>
    </>
  )
}

export default Hero
