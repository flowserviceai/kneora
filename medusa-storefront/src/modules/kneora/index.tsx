import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import content from "./product-content.json"
import {
  BrandExperience,
  FeatureExplorer,
  RoutineGuide,
  ShiftChecklist,
  ProductNumbers,
  PackagePicker,
  TradeStories,
  TrustDetails,
} from "./experience"

export const productPath = process.env.NEXT_PUBLIC_KNEORA_PRODUCT_HANDLE
  ? `/products/${process.env.NEXT_PUBLIC_KNEORA_PRODUCT_HANDLE}`
  : "/kneora"

export function Logo() {
  return (
    <LocalizedClientLink href="/" aria-label="Kneora home">
      <Image
        src="/kneora/logo.png"
        alt="Kneora"
        width={1881}
        height={836}
        priority
        style={{ width: 190, height: "auto" }}
      />
    </LocalizedClientLink>
  )
}

type Block = { type: string; settings: Record<string, string> }
type Section = {
  type: string
  settings?: Record<string, unknown>
  blocks?: Record<string, Block>
  block_order?: string[]
}
const sections = content.sections as unknown as Record<string, Section>
const blocks = (s: Section) => (s.block_order || []).map((id) => s.blocks![id])

export function PurchaseIntro() {
  const main = sections.main
  return (
    <>
      <h1>{String(main.settings?.headline)}</h1>
      <p className="k-lede">{String(main.settings?.subhead)}</p>
      <ul className="k-benefits">
        {blocks(main)
          .filter((b) => b.type === "benefit")
          .map((b) => (
            <li key={b.settings.text}>
              <span aria-hidden>✓</span>
              {b.settings.text}
            </li>
          ))}
      </ul>
    </>
  )
}
export function PurchaseFAQs() {
  return (
    <div className="k-faq">
      {blocks(sections.main)
        .filter((b) => b.type === "faq")
        .map((b) => (
          <details key={b.settings.question}>
            <summary>{b.settings.question}</summary>
            <div dangerouslySetInnerHTML={{ __html: b.settings.answer }} />
          </details>
        ))}
    </div>
  )
}

export function ProductDetails() {
  return (
    <div className="kneora">
      {content.order
        .filter(
          (id) =>
            !["main", "stories", "authority", "guide", "closing"].includes(id)
        )
        .map((id) => {
          const s = sections[id],
            v = s.settings || {}
          if (v.enabled === false) return null
          if (s.type === "editorial")
            return (
              <section
                className={`k-section ${v.dark ? "k-dark" : ""}`}
                key={id}
              >
                <div className="k-wrap k-columns">
                  <div>
                    <h2>
                      {String(v.heading || "Designed around both knees.")}
                    </h2>
                    {v.text ? (
                      <div
                        className="k-lede"
                        dangerouslySetInnerHTML={{ __html: String(v.text) }}
                      />
                    ) : null}
                  </div>
                  <div>
                    {blocks(s).map((b) => (
                      <article className="k-detail" key={b.settings.title}>
                        <h3>{b.settings.title}</h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: b.settings.text }}
                        />
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )
          if (s.type === "comparison")
            return (
              <section id={id} className="k-section k-wrap" key={id}>
                <h2>{String(v.heading)}</h2>
                <div
                  className="k-table"
                  tabIndex={0}
                  role="region"
                  aria-label={String(v.heading)}
                >
                  <table>
                    <caption className="sr-only">{String(v.heading)}</caption>
                    <thead>
                      <tr>
                        {[
                          v.column_feature,
                          v.column_single,
                          v.column_bundle,
                        ].map((x, i) => (
                          <th scope="col" key={i}>
                            {String(x)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {blocks(s).map((b) => (
                        <tr key={b.settings.feature}>
                          <th scope="row">{b.settings.feature}</th>
                          <td>{b.settings.single}</td>
                          <td>{b.settings.bundle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )
          if (s.type === "faq")
            return (
              <section
                id="questions"
                className="k-section k-wrap k-columns"
                key={id}
              >
                <h2>
                  Good questions.
                  <br />
                  Clear answers.
                </h2>
                <div className="k-faq">
                  {blocks(s).map((b) => (
                    <details key={b.settings.question}>
                      <summary>{b.settings.question}</summary>
                      <div
                        dangerouslySetInnerHTML={{ __html: b.settings.answer }}
                      />
                    </details>
                  ))}
                </div>
              </section>
            )
          return null
        })}
      <section className="k-section k-dark k-closing">
        <div className="k-wrap">
          <h2>Your next shift can wait a moment.</h2>
          <p>Make some room for yourself when the workday is done.</p>
          <a className="k-button" href="#Purchase">
            Choose your package
          </a>
        </div>
      </section>
    </div>
  )
}

export function ProductEducation() {
  return (
    <>
      <ProductNumbers />
      <TradeStories />
      <FeatureExplorer />
      <RoutineGuide />
      <ShiftChecklist />
      <TrustDetails />
      <ProductDetails />
    </>
  )
}

export function ProductPreview() {
  return (
    <div className="kneora">
      <p className="k-preview">
        Product preview · Product name, photos and prices pending
      </p>
      <section id="Purchase" className="k-section k-wrap k-columns">
        <div
          className="k-media-placeholder"
          aria-label="Product photography pending"
        />
        <div>
          <PurchaseIntro />
          <h3 id="packages">Choose your package</h3>
          <PackagePicker compact />
          <PurchaseFAQs />
        </div>
      </section>
      <ProductEducation />
    </div>
  )
}

export function Home() {
  return (
    <div className="kneora kx-home">
      <section className="kx-hero">
        <div className="k-wrap kx-hero-grid">
          <div className="kx-hero-copy">
            <p className="kx-kicker">For contractors. For the hours after.</p>
            <h1>
              You build
              <br />
              all day.
              <br />
              This time is yours.
            </h1>
            <p>
              Flooring, fitting, fixing. Your knees are part of the work. Meet
              dedicated knee care for when the tools go away.
            </p>
            <div className="kx-hero-actions">
              <LocalizedClientLink className="k-button" href={productPath}>
                Meet your after-work routine
              </LocalizedClientLink>
              <a href="#functions" className="kx-text-link">
                Explore the five functions
              </a>
            </div>
            <div className="kx-hero-footnote">
              <span aria-hidden="true">↔</span>One device. Both knees. A place
              in your evening.
            </div>
          </div>
          <div className="kx-hero-poster">
            <div className="kx-poster-top">
              <span>Kneora</span>
              <span>After the last job.</span>
            </div>
            <div className="kx-poster-main">
              <span>Tools down.</span>
              <strong>
                You
                <br />
                time.
              </strong>
              <div className="kx-poster-sun" aria-hidden="true" />
            </div>
            <div className="kx-poster-bottom">
              <p>Warmth. Massage. Light.</p>
              <a href="#shift-checklist">
                Start your end-of-shift checklist{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <nav className="kx-chapter-nav" aria-label="Explore this page">
        <a href="#your-workday">Your workday</a>
        <a href="#functions">The functions</a>
        <a href="#routine">Your routine</a>
        <a href="#packages">The packages</a>
        <a href="#our-approach">Our approach</a>
      </nav>
      <BrandExperience productPath={productPath} />
      <section id="questions" className="kx-section kx-home-faq">
        <div className="k-wrap k-columns">
          <div>
            <p className="kx-kicker">Before you clock out</p>
            <h2>
              A few things
              <br />
              worth knowing.
            </h2>
            <p>Start with the answers. Then take a closer look at Kneora.</p>
          </div>
          <PurchaseFAQs />
        </div>
      </section>
      <section className="kx-final">
        <div className="k-wrap">
          <p>For the people who put in the work.</p>
          <h2>
            Your tools have a place.
            <br />
            Your knee care should, too.
          </h2>
          <LocalizedClientLink className="k-button" href={productPath}>
            Get to know Kneora
          </LocalizedClientLink>
          <a href="#shift-checklist">Build your end-of-shift routine</a>
        </div>
      </section>
    </div>
  )
}
