import { cn } from "@/lib/utils"
import "./globals.css"
import { Inter, Poppins, Zen_Dots } from "next/font/google"
import Head from "next/head"
import Providers from "@/components/Provider"
// import pgg from "../../public/iconLog.s"
import { Metadata } from "next"

const popping1 = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})
const zenD = Zen_Dots({ subsets: ["latin"], weight: ["400"] })
export const metadata: Metadata = {
  title: "ChanceRoom",
  description: "NFT Polygon",
  icons: {
    icon: "/iconLog.svg",
  },
}

export default function RootLayout({
  children,
  buyTicketModal,
}: {
  children: React.ReactNode
  buyTicketModal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("", zenD.className)}>
        <Providers>
          {buyTicketModal}
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
