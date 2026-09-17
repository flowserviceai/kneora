import { Suspense } from "react"
import { Logo, productPath } from "@modules/kneora"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import MobileMenu from "@modules/layout/components/mobile-menu"
export default function Nav() {
  return (
    <>
      <a className="k-skip" href="#store-content">
        Skip to content
      </a>
      <div className="k-announcement">
        For the people who build. Knee care for after the job.
      </div>
      <header className="k-header">
        <div className="k-wrap k-nav">
          <Logo />
          <nav
            className="k-nav-links k-desktop-nav"
            aria-label="Main navigation"
          >
            <LocalizedClientLink href={productPath}>
              Explore Kneora
            </LocalizedClientLink>
            <LocalizedClientLink href={`${productPath}#specifications`}>
              Device details
            </LocalizedClientLink>
            <LocalizedClientLink href={`${productPath}#questions`}>
              FAQs
            </LocalizedClientLink>
          </nav>
          <div className="k-nav-links k-nav-actions">
            <LocalizedClientLink className="k-desktop-account" href="/account">
              Account
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink href="/cart">Cart</LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            <MobileMenu productPath={productPath} />
          </div>
        </div>
      </header>
    </>
  )
}
