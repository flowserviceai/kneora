import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Barlow_Condensed, Manrope } from "next/font/google"
import "styles/globals.css"
import "styles/kneora.css"
import "styles/kneora-experience.css"

const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-kneora-display",
  display: "swap",
})
const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-kneora-body",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
