"use client"
import React, { useEffect, useState } from "react"
import Button from "../Button"
import { MyButton } from "../ui/MyButton"
//@ts-ignore
import useSound from "use-sound"
import { useContractEvent } from "wagmi"
import { mainAbi } from "@/assets/abis/mainAbis"

const Sound = ({ contractAddress }: { contractAddress: any }) => {
  const [Sound, setSound] = useState(true)
  const [isRoledUp, setisRoledUp] = useState(false)

  const [play, { stop }] = useSound("/audio/chance.mp3", {
    volume: 0.1,
    // interrupt: false,
    // onload:true
  })
  const [play1, { stop: stopS }] = useSound("/audio/drop.mp3", {
    volume: 0.1,
    // interrupt: false,
    // onload:true
  })
  useContractEvent({
    address: contractAddress,
    abi: mainAbi,
    eventName: "Rollup",
    listener(log) {
      stop()
      play1()
      setisRoledUp(true)
    },
  })

  useEffect(() => {
    if (Sound) {
      play()
    }
  }, [play])

  function handleSound() {
    if (Sound) {
      stop()
      stopS()
    } else {
      if (isRoledUp) {
        play1()
      } else {
        play()
      }
    }

    setSound((prev) => !prev)
  }

  return (
    <MyButton
      IHeight={90}
      IWidth={220}
      type="button"
      className="my-2 font-semibold text-[1.2rem]"
      onClick={handleSound}
    >
      <span className="w-[220px] h-[70px] flex justify-center items-center font-semibold text-[1.2rem]">
        Sound {Sound ? "on" : "off"}
      </span>
    </MyButton>
  )
}

export default Sound
