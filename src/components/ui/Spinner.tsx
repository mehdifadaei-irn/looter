"use client"
import React from "react"
import Lottie from "lottie-react"

import Stopper from "../../assets/img/home/stopper.svg"
import spiner from "../../assets/img/lottie/spinner.json"
import Image from "next/image"
import Button from "../Button"
const Spinner = () => {
  return (
    <div className="relative w-[47%] flex flex-col items-center">
      <Image
        alt="nft1"
        src={"/dumber.png"}
        width={250}
        height={250}
        className="opacity-70 z-100 pt-14"
      />
      <div className="absolute flex justify-center items-center -bottom-[44px]">
        <Stopper className=" tra absolute" />
        <Lottie animationData={spiner} loop={true} className="z-30 spinnerr" />
      </div>
      <div className="absolute w-full  flex justify-center items-center bottom-[12%] z-50">
        <Image
          alt="hand"
          src={"/hand.png"}
          className="translate-x-9 z-40"
          width={70}
          height={50}
        />
        <Button styless="mb-12" scale="0.8">
          Spain
        </Button>
      </div>
    </div>
  )
}

export default Spinner
