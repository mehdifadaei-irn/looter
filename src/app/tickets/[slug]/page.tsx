import Button from "@/components/Button"
import React, { Suspense } from "react"

import Zard from "@/assets/img/home/za.svg"
import Mesh from "@/assets/img/home/mesh.svg"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import ChanceRoomTicketNumber from "@/components/ChanceRoomTicketNumber"

const mainList = [
  {
    name: "MFERS #1451",
    spainDate: "27 Apr",
    time: "- 19:00 utc",
    suplly: "3",
    price: "2 matic",
  },
]

const page = ({ params, ...other }: any) => {
  // const accountAddress = slug
  // console.log(other.searchParams.chanceRoomAddress)
  return (
    <div
      className={twMerge(
        "backg w-full h-screen flex flex-col  py-8 items-center overflow-hidden justify-between",
      )}
    >
      <h3 className="lg:font-[400] lg:text-[56px] text-[40px] font-light">Your Tickets</h3>
      {/* Tickets  border-2 rounded-3xl bg-[#F7F5D0] */}

      <div className="w-[95%] max-w-[955px] h-[530px] border-2 rounded-3xl bg-[#F7F5D0]  border-black mt-2 relative mb-14 overflow-hidden">
        <Suspense fallback={<div>helo</div>}>
          <div className="flex flex-col h-full items-center justify-between py-7  gap-y-2">
            <ChanceRoomTicketNumber
              contractAddress={other.searchParams.chanceRoomAddress}
              totallSupply={other.searchParams.totalSupply}
            />
          </div>
        </Suspense>
      </div>
      <div className="flex flex-col gap-y-4 items-center w-full">
        <p className="lg:font-[400] font-light lg:text-[36px] text-[24px]">GO TO CHANCE ROOOM</p>
        <div className="flex justify-between gap-x-14 min-w-[600px] w-[45%] ">
          <Button>
            <Link href={"/"} className="w-full h-full">
              BACK
            </Link>
          </Button>
          <Button>
            <Link
              href={`/lottery/${other.searchParams.chanceRoomAddress}`}
              className="w-full h-full"
            >
              LET’S GO
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page
