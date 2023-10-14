"use client"
import React from "react"
import Button from "./Button"
import Chevron from "../assets/img/chevron-down.svg"
import Glass from "../assets/img/glasses.svg"
import { toast, Toaster } from "sonner"
import { useAccount, useConnect, useEnsName } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { polygonMumbai } from "wagmi/chains"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import dynamic from "next/dynamic"
import Reveal from "./ui/Reveal"
import { MyButton } from "./ui/MyButton"

const NoSSRPara = dynamic(() => import("../components/ui/Paragraph"), { ssr: false })

const Navbar = () => {
  const { address, isConnected, isDisconnected, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    // chainId: polygonMumbai.id,
    connector: new MetaMaskConnector(),
    onSuccess(data) {
      localStorage.setItem("CONNECT_TOKEN", data.account)
    },
  })

  // React.useEffect(() => {
  //   const AUTH = localStorage.getItem("CONNECT_TOKEN")
  //   if (AUTH) {
  //     connect()
  //   }
  // }, [])

  // React.useEffect(() => {
  //   if (isDisconnected == true) {
  //     localStorage.setItem("CONNECT_TOKEN", "null")
  //   }
  // }, [isDisconnected])

  return (
    <>
      <nav className="w-full flex md:justify-between sm:justify-end justify-center px-40 pt-6">
        {/* <button onClick={()=> console.log(ensName)}>aa</button> */}
        <div className="md:block hidden">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading"
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === "authenticated")

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <div className="border-zinc-900 pr-3  mt-[4px]  border-[2.5px] flex gap-x-2 rounded-[50px] relative">
                          <div className="flex justify-center w-20 items-center h-[56px]  border-r-2 border-x-zinc-900">
                            <Glass className="translate-y-2 -translate-x-[4px]" width="60" />
                          </div>
                          <div className="flex justify-center items-center h-[56px]">
                            <NoSSRPara isConnected={isConnected} address={address} />
                          </div>
                        </div>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <div
                          className="border-zinc-900 pr-4  border-[2.5px] flex rounded-[50px] mt-2 gap-x-2 cursor-pointer"
                          onClick={openChainModal}
                        >
                          <div className="flex justify-center w-20 items-center h-[56px]  border-r-2 border-x-zinc-900">
                            <Glass className="translate-y-2 -translate-x-[4px]" width="60" />
                          </div>
                          <div className="flex justify-center items-center h-[56px]">
                            <p className="font-semibold text-[29px] leading-10">wrong network</p>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                        className="border-zinc-500 pr-3 pl-2 h-[55px]  border-[2.5px] flex rounded-[50px] font-pop mt-2"
                      >
                        <div className="h-[55px] flex items-center border-r-2 border-zinc-400">
                          <div className="flex justify-center items-center ">
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 36,
                                  height: 36,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 36, height: 36 }}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="font-semibold text-[20px] pl-1 leading-10  font-pop">
                          {chain.name}
                        </p>
                      </button>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
        <div>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
              connectModalOpen,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading"
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === "authenticated")

              return (
                <div
                  className=" font-pop -translate-y-2"
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <MyButton
                          IHeight={90}
                          IWidth={220}
                          onClick={openConnectModal}
                          type="button"
                        >
                          <span className="font-bold text-[23px] tracking-tight">
                            connect wallet
                          </span>
                        </MyButton>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <MyButton IHeight={90} IWidth={220} onClick={openChainModal} type="button">
                          <span className="font-semibold text-[23px] tracking-tight">
                            wrong network
                          </span>
                        </MyButton>
                      )
                    }

                    return (
                      <div style={{ display: "flex", gap: 0 }} className="flex font-pop ">
                        <MyButton
                          IHeight={80}
                          IWidth={190}
                          onClick={openAccountModal}
                          type="button"
                        >
                          <span className="font-bold text-[23px] tracking-tight">
                            {account.displayName}
                          </span>
                        </MyButton>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </nav>
    </>
  )
}

export default Navbar
