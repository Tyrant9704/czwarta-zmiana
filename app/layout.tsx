import type React from "react"
import type { Metadata } from "next"
import { New_Rocker, Montserrat } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

// Load Bebas Neue font
const newrocker = New_Rocker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-new-rocker",
  display: "swap",
})

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Czwarta zmiana - Blues Band",
  description: "Official website of Czwarta zmiana blues band",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${newrocker.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
