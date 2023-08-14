"use client"
import React from "react"
import Button from "./Button"
import Glass from "../assets/img/glasses.svg"
import { toast, Toaster } from "sonner"
import { useAccount, useConnect, useEnsName } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { polygonMumbai } from "wagmi/chains"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Navbar = () => {
  const { address, isConnected, isDisconnected } = useAccount()
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
        <div className="border-zinc-900 pr-4  border-[2.5px] flex rounded-3xl">
          <div className="flex justify-center items-center">
            <Glass className="translate-y-1 " />
          </div>
          <div className="h-[100%] -translate-x-3 flex items-center justify-center w-[2px] bg-zinc-900 " />
          <span className=" font-bold text-[33px] leading-10">0XLOOY</span>
          {/* {address ? (
            <span className=" font-bold text-[33px] leading-10">{address?.slice(0, 4).toString() || ""}</span>
          ) : (
          )} */}
          {/* <p className=" font-bold text-[33px] leading-10">{address?.slice(0, 4).toString()}</p> */}
          {/* <span className=" font-bold text-[33px] leading-10">0XLOOY</span> */}
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
                      return <Button onClick={openConnectModal}>Looter</Button>
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      )
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        {/* <button
                          onClick={openChainModal}
                          style={{ display: "flex", alignItems: "center" }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                              
                            </div>
                          )}
                          {chain.name}2222
                        </button> */}

                        <Button onClick={openAccountModal} type="button">
                          {account.displayName}
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
      <Toaster />
    </>
  )
}

export default Navbar
