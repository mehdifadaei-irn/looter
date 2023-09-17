"use client"
import { Drawer } from "@mui/material"
import React from "react"
import Menu from "@/../public/home/align-left.svg"
import Link from "next/link"

const LeftMenu = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  return (
    <div>
      <Menu className="w-[3rem] cursor-pointer" onClick={() => setOpenDrawer(true)} />
      <Drawer anchor={"left"} open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className="bg-[#6e7aa3] flex flex-col gap-y-5 pt-10 h-full">
          <p className="text-slate-100 border-b border-black">Mint more ticket</p>
          <p className="text-slate-100 border-b border-black">Sound off</p>
          <Link href={"/"} className="text-slate-100 border-b border-black">
            BACK
          </Link>
        </div>
      </Drawer>
    </div>
  )
}

export default LeftMenu
