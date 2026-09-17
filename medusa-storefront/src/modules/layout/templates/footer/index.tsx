import { Logo, productPath } from "@modules/kneora"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
export default function Footer() {
  return (
    <footer className="k-footer">
      <div className="k-wrap">
        <div className="k-footer-grid">
          <div>
            <Logo />
            <p>For the hours you call your own.</p>
            <p className="k-footer-description">
              Dedicated knee care for people who build, fit, fix and finish.
            </p>
          </div>
          <nav aria-label="Explore Kneora">
            <h2>Explore</h2>
            <LocalizedClientLink href={productPath}>
              The dual-knee device
            </LocalizedClientLink>
            <LocalizedClientLink href={`${productPath}#specifications`}>
              Dimensions & details
            </LocalizedClientLink>
            <LocalizedClientLink href={`${productPath}#questions`}>
              Product questions
            </LocalizedClientLink>
          </nav>
          <nav aria-label="Your Kneora account">
            <h2>Your Kneora</h2>
            <LocalizedClientLink href="/account">
              Your account
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart">Your cart</LocalizedClientLink>
          </nav>
        </div>
        <div className="k-footer-bottom">
          <small>© {new Date().getFullYear()} Kneora</small>
          <span>One device. Both knees.</span>
        </div>
      </div>
    </footer>
  )
}
