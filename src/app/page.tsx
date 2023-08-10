import Button from "@/components/Button"
import Loader2 from "../assets/img/loader-2.svg"
import Navbar from "@/components/Navbar"
import Group from "../assets/img/Group.svg"
import Ghost from "../assets/img/Ghost.svg"
import Punk1 from "../assets/img/punk1.svg"
import Circle from "../assets/img/circle.svg"
import Punk2 from "../assets/img/punk3.svg"

export default function Home() {
  return (
    <div className=" w-full h-full relative overflow-y-auto">
      {/* bg */}
      <div className="flex z-0 overflow-hidden">
        <Group className={"w-full h-screen opacity-70"} style={{}} />
        <Group className={"w-full h-screen opacity-70"} style={{}} />
      </div>
      {/* fg */}
      <div className=" absolute z-20 top-0 w-full">
        <Navbar />
        <main className=" w-full flex flex-col ">
          <div className="w-full flex justify-center ">
            <div className="flex lg:justify-between justify-center mt-8 w-[92%]  lg:w-[70%] xl:w-[72%]">
              <Ghost className="scale-125 hidden lg:block" />
              <div className="md:w-[50%]">
                <p className=" font-bold text-[70px] flex flex-col text-center">
                  <span className="text-[70px]">Lootery</span>
                  <span className="flex gap-x-4">
                    <span className="text-[#F24C00]">NFT</span>
                    <span className="relative">
                      <span className=" absolute left-3">polygon</span>
                      <Circle className=" lg:scale-[1.4] scale-[1.2] lg:top-4 top-0 absolute lg:left-9 left-4" />
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
            <p className="xl:w-[54%] md:w-[65%] w-[70%] flex flex-col text-center font-normal text-[28px]">
              <span>SANG LOTTERY:</span>A fixed and limited number of tickets will be sold to draw
              an NFT. Organizer will set the number of tickets, their price, and the deadline of
              the Sang Lottery at the beginning when She/He locks the price NFT in deployed SANG
              LOTTERY contract. If all the tickets have been sold before the deadline: Organizer
              can draw the winner, The NFT, and the organizer's money will transfer automatically.
            </p>
          </div>
          <div className="w-full bg-sky-500 flex justify-center mt-5">
            <Button>LUNCH</Button>
          </div>
        </main>
      </div>
    </div>
  )
}
