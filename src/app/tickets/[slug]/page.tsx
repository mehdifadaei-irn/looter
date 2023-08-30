import Button from "@/components/Button"
import React from "react"
import "../../../styles/custome.css"

import Zard from "@/assets/img/home/za.svg"
import Mesh from "@/assets/img/home/mesh.svg"
import Image from "next/image"
import Link from "next/link"

const mainList = [
  {
    name: "MFERS #1451",
    spainDate: "27 Apr",
    time: "- 19:00 utc",
    suplly: "3",
    price: "2 matic",
  },
  {
    name: "NAKAMIGUS  #66451",
    spainDate: "27 Apr",
    time: "- 19:00 utc",
    suplly: "6",
    price: "2 matic",
  },
  {
    name: "LIL NOUNS  #16121",
    spainDate: "27 Apr",
    time: "- 19:00 utc",
    suplly: "5",
    price: "2 matic",
  },
]

const page = ({ params: { slug } }: any) => {
  const accountAddress = slug
  return (
    <div className="backg w-full h-screen flex flex-col  pt-8 items-center">
      <h3 className="font-[400] text-[56px]">Your Tickets</h3>
      {/* Tickets  border-2 rounded-3xl bg-[#F7F5D0] */}

      <div className="w-[95%] max-w-[955px] h-[530px] border-2 rounded-3xl bg-[#F7F5D0]  border-black mt-2 relative mb-14 overflow-y-auto">
        {mainList.map((nft, i) => (
          <div key={i} className="flex flex-col h-full items-center pt-20 gap-y-2">
            <div className="relative">
              <span className="absolute top-3 right-4">x{nft.suplly}</span>
              <Image alt="nft" src={"/dum.png"} width={220} height={220} />
            </div>
            <p className="font-normal text-[30px]">{nft.name}</p>
            <div className="bg-[#EDD136] w-[350px] px-2 h-[110px] rounded-3xl border-2 border-black flex justify-center items-center">
              <p className="font-normal text-[28px] text-center">you have 12% chanse to win</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-4 items-center w-full">
        <p className="font-[400] text-[36px]">GO TO CHANS ROOOM</p>
        <div className="flex justify-between bg-slate-500 gap-x-14 min-w-[600px] w-[45%] ">
          <Button>
            <Link href={"/"}>BACK</Link>
          </Button>
          <Button>
            <Link href={`/lottery/${slug}`}>LET’S GO</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page
