"use client"
import React from "react"
import { useRef } from "react"
import { useDraggable } from "react-use-draggable-scroll"
const page = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref) // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex max-w-[60rem] overflow-x-scroll scrollbar-hide gap-x-4"
      {...events}
      ref={ref} // add reference and events to the wrapping div
    >
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
      <div className="flex-none w-52 h-32 bg-red-200" />
    </div>
  )
}

export default page
