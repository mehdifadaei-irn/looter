import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Poppins, Zen_Dots } from "next/font/google"
import Head from "next/head"
import Providers from "@/components/Provider"

const popping1 = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})
const zenD = Zen_Dots({ subsets: ["latin"], weight: ["400"] })
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
      <body className={cn("antialiased ", popping1.className, zenD.className)}>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
