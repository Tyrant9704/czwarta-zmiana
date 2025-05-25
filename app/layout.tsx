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
  title: "Czwarta Zmiana - Blues Rock",
  description: "Oficjalna strona zespołu Czwarta Zmiana. Blues-rockowa energia i autorska muzyka.",
  keywords: ['czwarta zmiana', 'blues rock', 'zespół', 'muzyka', 'rock'],
  openGraph: {
    title: 'Czwarta Zmiana - Blues Rock',
    description: 'Oficjalna strona zespołu blues-rockowego z Polski.',
    url: 'https://czwartazmiana.netlify.app',
    siteName: 'Czwarta Zmiana',
    images: [
      {
        url: 'https://czwartazmiana.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
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
