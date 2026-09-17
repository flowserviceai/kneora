"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function MobileMenu({ productPath }: { productPath: string }) {
  const menu = useRef<HTMLDetailsElement>(null)
  const close = () => {
    if (menu.current) menu.current.open = false
  }
  return (
    <details ref={menu} className="k-mobile-menu" onKeyDown={(event) => {
      if (event.key === "Escape") {
        close()
        menu.current?.querySelector("summary")?.focus()
      }
    }}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        <LocalizedClientLink onClick={close} href={productPath}>Explore Kneora</LocalizedClientLink>
        <LocalizedClientLink onClick={close} href={`${productPath}#specifications`}>Device details</LocalizedClientLink>
        <LocalizedClientLink onClick={close} href={`${productPath}#questions`}>FAQs</LocalizedClientLink>
        <LocalizedClientLink onClick={close} href="/account">Your account</LocalizedClientLink>
      </nav>
    </details>
  )
}
