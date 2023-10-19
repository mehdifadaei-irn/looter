"use client"
import React, { useState } from "react"
import Button from "../Button"
import { MyButton } from "../ui/MyButton"

const Sound = () => {
  const [Sound, setSound] = useState(true)

  function handleSound() {
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
