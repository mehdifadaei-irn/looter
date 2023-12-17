"use client"
import { motion, useTime, useTransform } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import { setWinner } from "@/redux/slices/winnerSelcet"
import { useDispatch } from "react-redux"

import Spinner from "../../assets/img/home/stopper.svg"
import Spinner1 from "../../assets/img/home/stoppp.svg"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import { useContractEvent, useContractRead } from "wagmi"
import { VrFABI } from "@/assets/abis/smap"
import { secondAbiBC3 } from "@/assets/abis/mainAbis"
import { polygon } from "wagmi/chains"
import { chanceRoomAbi } from "@/assets/abis/samp2"

const Needle = ({
  pieData,
  totalSupply,
  contractAddress,
  isStarted,
}: {
  pieData: { name: string; value: number }[]
  totalSupply: number
  contractAddress: `0x${string}`
  isStarted: boolean
}) => {
  const [count, setCount] = useState<number>(0)
  const [stop, setStop] = useState<boolean>(false)
  const [timeInter, setTimeInter] = useState<number>(50)
  const dispatch = useDispatch()
  //@ts-ignore
  const { Winner, addressOfContract, WinnerIndex } = useSelector((state) => state.winner)

  useEffect(() => {
    let interval1: any
    if (isStarted) {
      interval1 = setInterval(() => {
        if (!stop) {
          setCount((count) => count + 13)
        }
        console.log("w")
      }, timeInter)
    }

    if (stop) {
      clearInterval(interval1)
    }
    //@ts-ignore
    return () => clearInterval(interval1)
  }, [count, isStarted])

  const stopCounting = (address: string) => {
    console.log(address)
    let mainDeg = 0
    let mainIndex = 0
    pieData.map((pie, i) => {
      if (pie.name.toLocaleLowerCase() === address.toLocaleLowerCase()) {
        mainIndex = i
      }
    })
    if (mainIndex === 0) {
    } else {
      for (let index = 0; index < mainIndex; index++) {
        //@ts-ignore
        let indexDeg = (pieData.at(index)?.value * 360) / totalSupply
        mainDeg += indexDeg + 5 // 5 for Gap
      }
    }
    const rand = Math.floor(Math.random() * 70) + 25
    //@ts-ignore
    let percentRandMainIndex = (((pieData.at(mainIndex)?.value * 360) / totalSupply) * rand) / 100
    let fuckingMainDeg = mainDeg + percentRandMainIndex
    let curentDeg = count % 360
    let leftDeg
    console.log(fuckingMainDeg)
    if (curentDeg > fuckingMainDeg) {
      leftDeg = Math.abs(curentDeg - 360) + fuckingMainDeg
    } else {
      leftDeg = Math.abs(curentDeg - fuckingMainDeg)
    }
    let timeLef = (leftDeg / 10) * timeInter
    setTimeout(() => {
      setStop(true)
      dispatch(
        setWinner({ addressOfContract: contractAddress, Winner: address, WinnerIndex: mainIndex }),
      )
      toast.success(`winner selected ${address}`)
    }, timeLef + 50)
  }

  const {
    data: WinnerAddr,
    isError,
    isLoading,
    refetch,
  } = useContractRead({
    address: contractAddress,
    abi: chanceRoomAbi,
    functionName: "winner",
    chainId: polygon.id,
    onSuccess(data) {
      // console.log(data)
      //@ts-ignore
      if (data[1] !== "0x0000000000000000000000000000000000000000") {
        //@ts-ignore
        stopCounting(data[1])
      }
    },
  })

  // console.log(WinnerAddr[1])
  //0x0000000000000000000000000000000000000000

  useContractEvent({
    address: contractAddress,
    abi: secondAbiBC3,
    eventName: "VRFResponse",
    listener(log) {
      console.log(log)
      refetch()
      setTimeout(() => {
        refetch()
        //@ts-ignore
        stopCounting(WinnerAddr[1])
      }, 4000)
    },
  })

  // stopCounting("0xa72a90dffca7643f792e292ab3fd5780387e4ea8")
  return (
    <div
      // style={{
      //   width: Winner ? "124%" : "100%",
      // }}
      className=" flex justify-center items-center h-full relative flex-col z-[200]"
    >
      <motion.div
        // className=""
        // style={{ rotate }}
        className="z-[200]"
        animate={{
          // x: 80,
          // y: 10,
          rotate: -count,
          // transitionEnd: {
          //   display: "none",
          // },
        }}
        whileTap={{ scale: 1.2 }}
      >
        <Spinner1 className={`rotate-180 z-[200] `} />
      </motion.div>
      {/* <h1>{count}</h1> */}
      {/* <button
        onClick={() => stopCounting("0xa72a90dffca7643f792e292ab3fd5780387e4ea8")}
        className="absolute top-0"
      >
        Stop
      </button> */}
    </div>
  )
}

export default Needle
