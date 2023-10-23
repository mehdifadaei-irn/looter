"use client"
import React from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useMeasure from "react-use-measure"

const TextCarusel = () => {
  let [ref, { width }] = useMeasure()
  let [count, setCount] = useState(1)
  let [Stopcount, setStopCount] = useState(false)
  let [Startcount, setStartCount] = useState(false)
  let prev = usePrevious(count)

  let direction = count > prev ? 1 : -1

  useEffect(() => {
    let interval1: any
    interval1 = setInterval(() => {
      if (!Stopcount) {
        setCount((prev) => prev + 1)
      }
    }, 3000)

    if (Stopcount) {
      clearInterval(interval1)
    }

    return () => {
      clearInterval(interval1)
    }
  }, [count, Startcount])

  // useEffect(() => {
  //   let interval1: any
  //   if (isStarted) {
  //     interval1 = setInterval(() => {
  //       if (!stop) {
  //         setCount((count) => count + 10)
  //       }
  //       console.log("w")
  //     }, timeInter)
  //   }

  //   if (stop) {
  //     clearInterval(interval1)
  //   }
  //   //@ts-ignore
  //   return () => clearInterval(interval1)
  // }, [count, isStarted])
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
      className="relative flex cursor-pointer min-h-[270px] 2xl:h-[320px] xl:h-[330px] h-[340px] lg:w-[58%] w-[80%] items-center justify-center overflow-hidden lg:-translate-x-20 translate-x-0"
    >
      <AnimatePresence custom={{ direction, width }}>
        <motion.div
          key={count}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={{ direction, width }}
          className={`absolute flex items-center justify-center text-3xl font-bold `}
        >
          <p className="w-full  text-black  text-center font-[600] md:text-[23px] text-[20px] font-pop ">
            <span className="tracking-tight">{texts[Math.abs(count) % 4]}</span>A fixed and limited
            number of tickets will be sold to draw an NFT. Organizer will set the number of
            tickets, their price, and the deadline of the Sang Lottery at the beginning when She/He
            locks the price NFT in deployed SANG LOTTERY contract. If all the tickets have been
            sold before the deadline: Organizer can draw the winner, The NFT, and the organizer's
            money will transfer automatically.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

let variants = {
  enter: ({ direction, width }: any) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }: any) => ({ x: direction * -width }),
}

let texts = ["SANG LOTTERY:", "Warn LOTTERY:", "HASH LOTTERY:", "RIP LOTTERY:"]

function usePrevious(state: any) {
  let [tuple, setTuple] = useState([null, state])

  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }

  return tuple[0]
}

export default TextCarusel
