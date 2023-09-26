"use client"

import { FC, ReactNode } from "react"
import { WagmiConfig, createConfig, configureChains } from "wagmi"

import {
  // RainbowKitProvider,
  AvatarComponent,
} from "@rainbow-me/rainbowkit"

import { stringToColour } from "@/lib/generateColorFromHash"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import "@rainbow-me/rainbowkit/styles.css"

import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  metaMaskWallet,
  coinbaseWallet,
  phantomWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"

import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit"
import { mainnet, polygon, optimism, arbitrum, zora, sepolia, polygonMumbai } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { Toaster } from "sonner"
import { store } from "@/redux/store"
import { Provider } from "react-redux"

// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client"

// alchemy OZiUMNTZ4bLFW_i52If0jt1gZvJ1YiDh
// id wallet 8b613e9540de4d92d09f5ed1611877c9
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, polygon],
//   [publicProvider()],
// )

// const clinet = new ApolloClient({
//   uri: "https://rickandmortyapi.com/graphql",
//   cache: new InMemoryCache(),
// })

const queryClient = new QueryClient()

const { chains, publicClient } = configureChains(
  [polygon],
  // [alchemyProvider({ apiKey: "" }), publicProvider()],
  [alchemyProvider({ apiKey: "0MsDcTulwe_aZJEcg150EPv6Tnwn2qn5" })],
)

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      trustWallet({ chains, projectId: "8b613e9540de4d92d09f5ed1611877c92" }),
      metaMaskWallet({ chains, projectId: "8b613e9540de4d92d09f5ed16112877c9" }),
      coinbaseWallet({ appName: "lootery", chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      phantomWallet({ chains }),
      ledgerWallet({ chains, projectId: "8b613e9540de411d92d09f5ed1611877c9" }),
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
      {/* <ApolloProvider client={clinet}> */}
      <Provider store={store}>
        <WagmiConfig config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider coolMode chains={chains}>
              {children}
            </RainbowKitProvider>
            <Toaster position="top-right" richColors />
          </QueryClientProvider>
        </WagmiConfig>
      </Provider>
      {/* </ApolloProvider> */}
    </>
  )
}

export default Providers
