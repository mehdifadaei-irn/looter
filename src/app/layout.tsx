import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import Head from "next/head"
import Providers from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })
const popping = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lootery",
  description: "NFT Polygon",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={cn("antialiased", popping.className)}>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
