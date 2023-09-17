import React from "react"
import Loader2 from "../assets/img/loader-2.svg"



const loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center backg">
      <Loader2 className="mr-2 animate-spin" />
    </div>
  )
}

export default loading
