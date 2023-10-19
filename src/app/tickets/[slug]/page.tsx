import Button from "@/components/Button"
import React, { Suspense } from "react"

import Zard from "@/assets/img/home/za.svg"
import Mesh from "@/assets/img/home/mesh.svg"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import ChanceRoomTicketNumber from "@/components/ChanceRoomTicketNumber"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { Toaster } from "sonner"
import { MyButton } from "@/components/ui/MyButton"
import { ArrowBack, RectMain } from "@/components/Icons"

const page = ({ params, ...other }: any) => {
  // const accountAddress = slug
  // console.log(other.searchParams.chanceRoomAddress)
  // const router = useRouter()

  // function handleLetsGo() {
  //   router.push(`/lottery/${other.searchParams.chanceRoomAddress}`)
  // }
  return (
    <div className={twMerge("backg w-full flex flex-col items-center overflow-hidden relative")}>
      <Navbar />
      <h3 className="lg:font-[400] lg:text-[56px] text-[40px] font-light">Your Tickets</h3>
      {/* Tickets  border-2 rounded-3xl bg-[#F7F5D0] */}
      <RectMain
        width={980}
        height={550}
        className="absolute z-0 top-[140px] w-[90%] min-w-[51rem]"
      />
      <div className="w-[95%] max-w-[955px] min-h-[520px]  relative  overflow-hidden">
        <Suspense fallback={<div>helo</div>}>
          <div className="flex flex-col h-full items-center justify-between pt-8 pb-[4rem]">
            <ChanceRoomTicketNumber
              contractAddress={other.searchParams.chanceRoomAddress}
              totallSupply={other.searchParams.totalSupply}
            />
          </div>
        </Suspense>
      </div>

      <div className="flex flex-col gap-y-1 items-center w-full">
        <p className="lg:font-[400] font-light lg:text-[36px] text-[24px] z-40 pt-8">
          GO TO CHANCE ROOOM
        </p>
        <div className="flex justify-between gap-x-14 min-w-[600px] w-[45%] relative">
          <ArrowBack width={130} height={200} className="absolute z-50 -right-[41%] bottom-20 " />
          <MyButton IHeight={90} IWidth={220} type="button">
            <Link
              href={"/"}
              className="w-[220px] h-[70px] pb-[4px] flex items-center justify-center font-bold text-[1.4rem]"
            >
              BACK
            </Link>
          </MyButton>
          <MyButton IHeight={90} IWidth={220} type="button">
            <Link
              href={`/lottery/${other.searchParams.chanceRoomAddress}`}
              className="w-[220px] h-[70px] pb-[4px] flex items-center justify-center font-bold text-[1.4rem]"
            >
              LET’S GO
            </Link>
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default page
