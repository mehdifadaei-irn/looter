"use client"

import { FC, ReactNode } from "react"
import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
interface LayoutProps {
  children: ReactNode
}

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
    </>
  )
}

export default Providers
