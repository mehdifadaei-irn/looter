"use client"
import React, { useState } from "react"
import Button from "../Button"

const Sound = () => {
  const [Sound, setSound] = useState(true)

  function handleSound() {
    setSound((prev) => !prev)
  }
  return (
    <Button styless="mb-1" scale="0.9" onClick={handleSound}>
      Sound {Sound ? "on" : "off"}
    </Button>
  )
}

export default Sound
