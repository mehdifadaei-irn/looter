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
  const [isRoledUp, setisRoledUp] = useState<"" | boolean>("")

  const [play, { stop }] = useSound("/audio/FreeMe.mp3", {
    volume: 0.1,
    // interrupt: false,
    // onload:true
  }) //first play
  const [play1, { stop: stopS }] = useSound("/audio/drop.mp3", {
    volume: 0.1,
    // interrupt: false,
    // onload:true
  })
  const [play2, { stop: stopS2 }] = useSound("/audio/WiinerU.mp3", {
    volume: 0.1,
    // interrupt: false,
    // onload:true
  })

  //start
  useContractEvent({
    address: contractAddress,
    abi: mainAbi,
    eventName: "Rollup",
    listener(log) {
      setisRoledUp(true)
      stop()
      play1()
    },
  })

  //end
  useContractEvent({
    address: contractAddress,
    abi: mainAbi,
    eventName: "Response",
    listener(log) {
      setisRoledUp(false)
      stop()
      stopS()
      play2()
    },
  })

  useEffect(() => {
    if (Sound) {
      if (isRoledUp === "") {
        play()
      }
      if (isRoledUp === true) {
        stop()
        play1()
      }
      if (isRoledUp === false) {
        stop()
        stopS()
        play2()
      }
    }
  }, [isRoledUp])

  function handleSound() {
    if (Sound) {
      stop()
      stopS()
      stopS2()
    } else {
      if (isRoledUp === "") {
        play()
      }
      if (isRoledUp === true) {
        stop()
        play1()
      }
      if (isRoledUp === false) {
        stop()
        stopS()
        play2()
      }
    }

    setSound((prev) => !prev)
  }

  return (
    <>
      <MyButton
        IHeight={90}
        IWidth={220}
        type="button"
        className="my-2 font-semibold text-2xl lg:flex hidden"
        onClick={handleSound}
      >
        <span className="w-[220px] h-[70px] flex justify-center items-center font-semibold text-2xl">
          Sound {Sound ? "on" : "off"}
        </span>
      </MyButton>

      <a
        onClick={handleSound}
        className="w-[50px] p-2 h-[55px] bg-yellow-100 rounded-full lg:hidden flex justify-center items-center border-slate-900 border-[3px]"
      >
        <span className="flex justify-center items-center font-medium text-[1.1rem]">
          {Sound ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="22" x2="16" y1="9" y2="15" />
              <line x1="16" x2="22" y1="9" y2="15" />
            </svg>
          )}
        </span>
      </a>
    </>
  )
}

export default Sound
