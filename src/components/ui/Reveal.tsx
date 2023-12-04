"use client"
import React, { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, useIsPresent } from "framer-motion"
import { useDraggable } from "react-use-draggable-scroll"

interface ReavealProps {
  children: JSX.Element
  width?: string
}

const Reveal = ({ children, width = "fit-content" }: ReavealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })


  const mainControlls = useAnimation()
  useEffect(() => {
    if (isInView) {
      // console.log("her")
      mainControlls.start("visible")
    }
  }, [isInView])

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: width,
        // overflow: "hidden",
      }}
      className="scrollbar-hide "
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -85 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControlls}
        transition={{ duration: 0.6 }}
        
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Reveal
