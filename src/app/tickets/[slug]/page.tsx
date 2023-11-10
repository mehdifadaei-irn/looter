"use client"
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
        "backg w-full flex flex-col items-center overflow-hidden relative  min-h-[100vh]",
      )}
    >
      <Toaster position="top-right" richColors />
      <Navbar />
      <h3 className="font-[400] text-[56px]  -translate-y-14 opacity-0 xl:opacity-100">
        Your Tickets
      </h3>
      {/* Tickets  border-2 rounded-3xl bg-[#F7F5D0] */}
      <RectMain width={900} height={490} className="absolute z-0 top-[116px] lg:w-[90%] w-full sm:block hidden " />

      <div className="flex flex-col justify-between h-[75vh]">
        <div className="w-[95%] max-w-[955px]  min-h-[440px]  relative  overflow-hidden">
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
          <p className="font-[400] text-[32px] z-40">GO TO CHANCE ROOOM</p>
          <div className="flex justify-between gap-x-14 lg:min-w-[900px] min-w-[560px] w-[45%] relative mt-auto">
            <ArrowBack
              width={130}
              height={200}
              className="absolute z-50 -right-[41%] bottom-20 "
            />
            <MyButton IHeight={90} IWidth={220} type="button">
              <Link
                href={"/"}
                className="w-[220px] h-[70px] pb-[4px] flex items-center justify-center font-bold text-[1.4rem]"
              >
                BACK
              </Link>
            </MyButton>
            <MyButton IHeight={90} IWidth={220} type="button" onClick={handleLetsGo}>
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
