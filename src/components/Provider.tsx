"use client"

import { FC, ReactNode } from "react"
import { WagmiConfig, createConfig, configureChains } from "wagmi"

import "@rainbow-me/rainbowkit/styles.css"

import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets"

import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit"
import { mainnet, polygon, optimism, arbitrum, zora, sepolia, polygonMumbai } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
// a OZiUMNTZ4bLFW_i52If0jt1gZvJ1YiDh
// id 8b613e9540de4d92d09f5ed1611877c9
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, polygon],
//   [publicProvider()],
// )

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, sepolia, polygonMumbai],
  [alchemyProvider({ apiKey: "OZiUMNTZ4bLFW_i52If0jt1gZvJ1YiDh" }), publicProvider()],
)

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      trustWallet({ chains, projectId: "8b613e9540de4d92d09f5ed1611877c9" }),
      metaMaskWallet({ chains, projectId: "metaMaskWallet" }),
    ],
  },
])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
interface LayoutProps {
  children: ReactNode
}

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default Providers
