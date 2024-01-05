"use client"
import Button from "@/components/Button"
import React, { Suspense } from "react"

import Link from "next/link"
import { twMerge } from "tailwind-merge"
import ChanceRoomTicketNumber from "@/components/ChanceRoomTicketNumber"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import { MyButton } from "@/components/ui/MyButton"
import { ArrowBack, RectMain } from "@/components/Icons"
import { useAccount } from "wagmi"

const page = ({ params, ...other }: any) => {
  // const accountAddress = slug
  // console.log(other.searchParams.chanceRoomAddress)
  const { isConnected } = useAccount()
  const router = useRouter()

  function handleLetsGo() {
    if (isConnected) {
      router.push(`/lottery/${other.searchParams.chanceRoomAddress}`)
    } else {
      toast.error("you need to connect your wallet to see chance room")
    }
  }
  return (
    <div
      className={twMerge(
        "backg w-full flex flex-col items-center overflow-y-hidden overflow-hidden relative  min-h-[100vh]",
      )}
    >
      <Toaster position="top-center" richColors />
      <Navbar />
      <h3 className="font-[600] text-[46px]  -translate-y-14 opacity-0 xl:opacity-100 sm:block hidden">
        Your Tickets
      </h3>
      {/* Tickets  border-2 rounded-3xl bg-[#F7F5D0] */}
      <RectMain
        width={900}
        height={490}
        className="absolute z-0 top-[116px] lg:w-[90%] w-full md:block hidden  "
      />

      <div className="flex flex-col justify-between md:h-[80vh] sm:h-[85vh] md:w-[72%] w-full items-center">
        <div className="w-[95%] max-w-[955px]   relative  overflow-hidden">
          <Suspense fallback={<div>helo</div>}>
            <div className="flex flex-col h-full items-center  pt-0 pb-[5rem]">
              <ChanceRoomTicketNumber
                contractAddress={other.searchParams.chanceRoomAddress}
                totallSupply={other.searchParams.totalSupply}
              />
            </div>
          </Suspense>
        </div>

        <div className="flex flex-col items-center w-full">
          <p className="font-[500] text-2xl z-40 text-center ">GO TO CHANCE ROOOM</p>
          <div className="flex sm:flex-row flex-col sm:items-start items-center justify-between gap-x-10 w-2/3 md:min-w-[35rem] min-w-[29rem] ">
            <ArrowBack
              width={130}
              height={200}
              className="absolute z-50 -right-[41%] bottom-20 lg:block hidden "
            />
            <MyButton
              IHeight={90}
              IWidth={220}
              type="button"
              className="xl:!scale-100 sm:!scale-[0.85] !scale-[0.80]"
            >
              <a
                href={`/Ticket/${other.searchParams?.chanceRoomAddress}`}
                //http://localhost:3000/Ticket/0x00000F76EAf28E48FF9e8515e57961A376E81bDB
                className="w-[220px] h-[70px] pb-[4px] flex items-center justify-center font-bold text-[1.4rem] "
              >
                BACK
              </a>
            </MyButton>
            <MyButton
              IHeight={90}
              IWidth={220}
              type="button"
              onClick={handleLetsGo}
              className="xl:!scale-100 sm:!scale-[0.85] !scale-[0.80]"
            >
              <p className="w-[220px] h-[70px] pb-[4px] flex items-center justify-center font-bold text-[1.4rem]">
                LET’S GO
              </p>
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
