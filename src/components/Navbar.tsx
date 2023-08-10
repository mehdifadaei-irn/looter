"use client"
import React from "react"
import Button from "./Button"
import Glass from "../assets/img/glasses.svg"
import { toast, Toaster } from "sonner"
import { useAccount, useConnect, useEnsName } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { polygonMumbai } from "wagmi/chains"

const Navbar = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    // chainId: polygonMumbai.id,
    connector: new MetaMaskConnector(),
    onSuccess(data) {
      localStorage.setItem("CONNECT_TOKEN", data.account)
    },
  })

  React.useEffect(() => {
    const AUTH = localStorage.getItem("CONNECT_TOKEN")
    if (AUTH) {
      connect()
    }
  }, [])

  return (
    <>
      <nav className="w-full flex justify-between px-10 pt-8">
        {/* <button onClick={()=> console.log(ensName)}>aa</button> */}
        <div className="border-zinc-900 pr-4  border-[2.5px] flex rounded-3xl">
          <div className="flex justify-center items-center">
            <Glass className="translate-y-1 " />
          </div>
          <div className="h-[100%] -translate-x-3 flex items-center justify-center w-[2px] bg-zinc-900 " />
          <span className=" font-bold text-[33px] leading-10">{address?.slice(0, 4)}</span>
          {/* <span className=" font-bold text-[33px] leading-10">0XLOOY</span> */}
        </div>
        <div>
          <Button onClick={() => connect()}>
            connect wallet
            {/* {isConnected ? "con" : "not"} */}
          </Button>
        </div>
      </nav>
      <Toaster />
    </>
  )
}

export default Navbar
