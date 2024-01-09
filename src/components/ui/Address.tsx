"use client"
import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Button from "../Button"
import { MyButton } from "./MyButton"
import Glass from "../../assets/img/glasses.svg"
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
                  <MyButton
                    IHeight={90}
                    IWidth={220}
                    onClick={openConnectModal}
                    type="button"
                    className="-translate-y-2 ml-2"
                  >
                    <span className="font-bold text-[23px] tracking-tight">connect wallet</span>
                  </MyButton>
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
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="sm:text-sm text-sm  text-black font-normal"
                  >
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
