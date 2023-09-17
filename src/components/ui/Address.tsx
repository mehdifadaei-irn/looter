"use client"
import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Button from "../Button"

const Address = () => {
  return (
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
        // console.log(account)
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
                  <Button onClick={openConnectModal} type="button" fontW="text-[20px]" styless="-translate-y-2 ml-2">
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button" fontW="text-[20px]" styless="-translate-y-2 ml-2">
                    Wrong network
                  </Button>
                )
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={openAccountModal} type="button" className="text-xl text-black font-medium">
                    {account.displayName}
                    {account.ensAvatar}
                    {/* {account.displayBalance ? ` (${account.displayBalance})` : ""} */}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default Address
