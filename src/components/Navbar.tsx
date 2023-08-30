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
      <nav className="w-full flex justify-between px-10 pt-8">
        {/* <button onClick={()=> console.log(ensName)}>aa</button> */}

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
                      <div className="border-zinc-900 pr-4  border-[2.5px] flex rounded-3xl">
                        <div className="flex justify-center w-20 items-center border-r-2 border-zinc-900">
                          <Glass className="translate-y-1 " />
                        </div>
                        <div className="h-[100%] -translate-x-3 flex items-center justify-center w-[2px] bg-zinc-900 duration-700" />
                        <NoSSRPara isConnected={isConnected} address={address} />
                      </div>
                    )
                  }

                  if (chain.unsupported) {
                    return (
                      <div className="border-zinc-900 pr-4  border-[2.5px] flex rounded-3xl">
                        <div className="flex justify-center w-20 items-center border-r-2 border-zinc-900">
                          <Glass className="translate-y-1 " />
                        </div>
                        <div className="h-[100%] -translate-x-3 flex items-center justify-center w-[2px] bg-zinc-900 duration-700" />
                        <p className="font-semibold text-[33px] leading-10">Wrong network</p>
                      </div>
                    )
                  }

                  return (
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                      className="border-zinc-500 pr-2 pl-1 h-[45px]  border-[2.5px] flex rounded-3xl font-pop"
                    >
                      <div className="h-[45px] flex items-center border-r-2 border-zinc-400">
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
        {/* <div className="border-zinc-900 pr-4  border-[2.5px] flex rounded-3xl">
          <div className="flex justify-center items-center">
            <Glass className="translate-y-1 " />
            </div>
            <div className="h-[100%] -translate-x-3 flex items-center justify-center w-[2px] bg-zinc-900 duration-700" />
            <NoSSRPara isConnected={isConnected} address={address} />
          </div> */}

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
                  className=" font-pop"
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
                        <Button onClick={openConnectModal} type="button">
                          Connect Wallet
                        </Button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <Button onClick={openChainModal} type="button">
                          Wrong network
                        </Button>
                      )
                    }

                    return (
                      <div style={{ display: "flex", gap: 0 }} className="flex font-pop ">
                        <Button onClick={openAccountModal} scale="0.77" type="button">
                          {account.displayName}
                          {/* <span className="hidden lg:block">
                            {account.displayBalance ? ` (${account.displayBalance})` : ""}
                          </span> */}
                        </Button>
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
