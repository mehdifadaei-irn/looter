"use client"
import React from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useMeasure from "react-use-measure"

const TextCarusel = () => {
  let [ref, { width }] = useMeasure()
  let [count, setCount] = useState(1)
  let prev = usePrevious(count)
  let direction = count > prev ? 1 : -1

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div
      ref={ref}
      className="relative flex min-h-[270px] 2xl:h-[320px] xl:h-[330px] h-[340px] lg:w-[58%] w-[80%] items-center justify-center overflow-hidden lg:-translate-x-20 translate-x-0"
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
  return (
    <div
      ref={ref}
      className="relative flex h-full items-center justify-center overflow-hidden bg-gray-700"
    >
      <AnimatePresence custom={{ direction, width }}>
        <motion.div
          key={count}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={{ direction, width }}
          className={`absolute flex h-2/3 w-2/3 items-center justify-center text-3xl font-bold `}
        >
          <p>{texts[Math.abs(count) % 4]}</p>
          <p className="lg:mt-7 md:w-[54%] w-[70%] text-black  text-center font-[600] md:text-[23px] text-[21px] font-pop lg:-translate-x-20 translate-x-0">
            <span className="tracking-tight">SANG LOTTERY:</span>A fixed and limited number of
            tickets will be sold to draw an NFT. Organizer will set the number of tickets, their
            price, and the deadline of the Sang Lottery at the beginning when She/He locks the
            price NFT in deployed SANG LOTTERY contract. If all the tickets have been sold before
            the deadline: Organizer can draw the winner, The NFT, and the organizer's money will
            transfer automatically.
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
