import React from "react"
import { Skeleton } from "@mui/material"

const loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center backg">
      <Skeleton
        variant="rounded"
        // width={210}
        height={2000}
        animation="wave"
        className="w-[95%] max-w-[955px]"
      />
    </div>
  )
}

export default loading
