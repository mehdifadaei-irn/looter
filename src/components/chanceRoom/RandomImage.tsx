"use client"
import Image from "next/image"
import React from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useMeasure from "react-use-measure"

import { useSelector } from "react-redux"
import { useAccount } from "wagmi"

const RandomImage = () => {
  let [ref, { width }] = useMeasure()
  let [count, setCount] = useState(1)
  let [Stopcount, setStopCount] = useState(false)
  let [Startcount, setStartCount] = useState(false)
  let prev = usePrevious(count)
  //@ts-ignore
  const { Winner, addressOfContract } = useSelector((state) => state.winner)
  const { address } = useAccount()
  let direction = count > prev ? 1 : -1

  useEffect(() => {
    let interval1: any
    interval1 = setInterval(() => {
      if (!Stopcount) {
        setCount((prev) => prev + 1)
      }
    }, 17000)

    if (Stopcount) {
      clearInterval(interval1)
    }

    return () => {
      clearInterval(interval1)
    }
  }, [count, Startcount])
  return (
    <div
      ref={ref}
      onClick={() => {
        setStopCount(true)
      }}
      onMouseLeave={() => {
        setStopCount(false)
        setStartCount(true)
      }}
      onMouseEnter={() => {
        setStopCount(true)
        setStartCount(false)
      }}
      className="flex-col w-[25%] justify-end pl-24  pb-4 sm:flex hidden"
    >
      <div className={`absolute items-center justify-center text-3xl font-bold xl:flex hidden`}>
        <Image
          // src={shuffleArray(texts)[Math.abs(count) % 5]}
          src={
            Winner == ""
              ? shuffleArray(texts)[Math.abs(count) % 5]
              : Winner?.toLocaleLowerCase() == address?.toLocaleLowerCase()
              ? shuffleArray(WinnerList)[Math.abs(count) % 5]
              : shuffleArray(loser)[Math.abs(count) % 5]
          }
          width={330}
          // className="xl:block hidden"
          height={330}
          alt="frog"
        />
      </div>
    </div>
  )
}

// <AnimatePresence custom={{ direction, width }}>
//         <motion.div
//           key={count}
//           variants={variants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           custom={{ direction, width }}
//           className={`absolute items-center justify-center text-3xl font-bold xl:flex hidden`}
//         >
//           {/* <p className="text-white">
//             <span className="tracking-tight">{texts[Math.abs(count) % 4]}</span>
//           </p> */}

//         </motion.div>
//       </AnimatePresence>

let variants = {
  enter: ({ direction, width }: any) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }: any) => ({ x: direction * -width }),
}

function shuffleArray(array: string[]) {
  // Create a copy of the original array
  const newArray = array.slice()
  for (let i = newArray.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const randomIndex = Math.floor(Math.random() * (i + 1))

    // Swap elements at randomIndex and i
    ;[newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]]
  }
  return newArray
}

let WinnerList = [
  "/home/winnerGif.avif",
  "/home/winnerGif.avif",
  "/home/winnerGif.avif",
  "/home/winnerGif.avif",
  "/home/winnerGif.avif",
]
let loser = [
  "/home/loser.avif",
  "/home/loser.avif",
  "/home/loser.avif",
  "/home/loser.avif",
  "/home/loser.avif",
]

let texts = ["/home/1a.avif", "/home/2a.avif", "/home/3a.avif", "/home/4a.avif", "/home/5a.avif"]

function usePrevious(state: any) {
  let [tuple, setTuple] = useState([null, state])

  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }

  return tuple[0]
}

export default RandomImage
