"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const functions = [
  {
    name: "Heat",
    title: "A warmer way to wind down.",
    text: "Built-in heating brings warmth to your knee-care routine. One of five functions, housed in a device made for both knees.",
    note: "Use the heating settings and limits in the supplied instructions.",
    symbol: "≈",
    color: "heat",
  },
  {
    name: "Vibration",
    title: "Give your evening a different rhythm.",
    text: "Vibration massage is built into the same housing. Explore the device’s massage functions from the central control panel.",
    note: "Follow the supplied guide for available modes and settings.",
    symbol: "∿",
    color: "vibration",
  },
  {
    name: "Air compression",
    title: "Another dimension to your massage.",
    text: "Air compression adds a second massage function alongside vibration. Both belong to the same dual-knee device.",
    note: "Confirm the fit and follow the supplied operating instructions.",
    symbol: "↔",
    color: "compression",
  },
  {
    name: "Red light",
    title: "Red light. Built right in.",
    text: "A red-light function is part of Kneora’s feature set, alongside warmth and massage. There is no separate panel to add to your package.",
    note: "Light wavelength, output and treatment outcomes are not yet verified.",
    symbol: "◉",
    color: "red",
  },
  {
    name: "Blue light",
    title: "A second light function to explore.",
    text: "The device also includes a blue-light function. The top-mounted controls keep the device interface in view.",
    note: "Refer to the product manual for light-function operation.",
    symbol: "◉",
    color: "blue",
  },
]

export function FeatureExplorer() {
  const [active, setActive] = useState(0)
  const feature = functions[active]
  return (
    <section className="kx-explorer kx-section" id="functions">
      <div className="k-wrap">
        <div className="kx-section-heading">
          <div>
            <p className="kx-kicker">Get to know Kneora</p>
            <h2>
              Five functions.
              <br />
              Find your wind-down.
            </h2>
          </div>
          <p>
            Take a closer look at what’s inside your after-work routine. Tap a
            function to explore.
          </p>
        </div>
        <div
          className="kx-feature-tabs"
          role="tablist"
          aria-label="Device functions"
        >
          {functions.map((f, i) => (
            <button
              key={f.name}
              id={`feature-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="feature-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault()
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                      ? 4
                      : (active + (e.key === "ArrowRight" ? 1 : 4)) % 5
                  setActive(next)
                  document.getElementById(`feature-tab-${next}`)?.focus()
                }
              }}
            >
              <span aria-hidden="true">{f.symbol}</span>
              {f.name}
            </button>
          ))}
        </div>
        <div
          id="feature-panel"
          className={`kx-feature-panel kx-${feature.color}`}
          role="tabpanel"
          aria-labelledby={`feature-tab-${active}`}
        >
          <div className="kx-feature-visual" aria-hidden="true">
            <div className="kx-orbit kx-orbit-one" />
            <div className="kx-orbit kx-orbit-two" />
            <span className="kx-function-symbol">{feature.symbol}</span>
            <span className="kx-visual-label">{feature.name}</span>
          </div>
          <div className="kx-feature-copy">
            <span className="kx-counter">
              {String(active + 1).padStart(2, "0")} / 05
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <p className="kx-fine">{feature.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const trades = [
  {
    name: "Flooring & tile",
    heading: "You see the details from the ground up.",
    text: "Measuring. Cutting. Setting. Finishing. Floor-level work is skilled work—and your knees are part of the job. Build some time for yourself into the other end of the day.",
    words: ["The last tile", "The tools away", "Your time"],
  },
  {
    name: "Plumbing & electrical",
    heading: "The awkward spaces are part of your day.",
    text: "Under sinks, beside cabinets, behind the work everyone else sees. When the last fitting is in place, make room in your evening for a routine that belongs to you.",
    words: ["The final fitting", "The van packed", "Your time"],
  },
  {
    name: "Building & landscaping",
    heading: "You put something into every project.",
    text: "From the first measurement to the final clean-up, the work asks a lot of you. Kneora’s world starts when the workday ends, with dedicated knee care at home.",
    words: ["The job wrapped", "The boots off", "Your time"],
  },
]

export function TradeStories() {
  const [selected, setSelected] = useState(0)
  const trade = trades[selected]
  return (
    <section className="kx-trades kx-section" id="your-workday">
      <div className="k-wrap kx-trade-layout">
        <div>
          <p className="kx-kicker">Made for the after-work part</p>
          <h2>
            Different trades.
            <br />
            Common ground.
          </h2>
          <p>You look after the work. Make room to look after yourself, too.</p>
          <div className="kx-trade-options" aria-label="Explore your trade">
            {trades.map((t, i) => (
              <button
                key={t.name}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {t.name}
                <span aria-hidden="true">{selected === i ? "−" : "+"}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="kx-trade-story" aria-live="polite">
          <div className="kx-workday-art" aria-hidden="true">
            <span>{trade.words[0]}</span>
            <span>{trade.words[1]}</span>
            <strong>{trade.words[2]}.</strong>
            <div className="kx-art-sun" />
          </div>
          <h3>{trade.heading}</h3>
          <p>{trade.text}</p>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    name: "Make room",
    title: "Let the workday end.",
    text: "Choose a place at home where you can sit comfortably and make time for yourself. Keep the product manual nearby before your first use.",
    detail: "A routine starts with a place for it.",
  },
  {
    name: "Get familiar",
    title: "Know your device before you begin.",
    text: "Read the supplied instructions, check the fit, and learn the controls and safety guidance. Use only the settings and session length specified for your device.",
    detail: "Your manual is the guide to operation.",
  },
  {
    name: "Make it yours",
    title: "Give knee care a place in your evening.",
    text: "Choose a moment that fits your schedule. For storage and cleaning, follow the device care instructions. Use after-care gel only as directed on its own label.",
    detail: "Your evening. Your own pace.",
  },
]

export function RoutineGuide() {
  const [step, setStep] = useState(0)
  return (
    <section className="kx-routine kx-section" id="routine">
      <div className="k-wrap">
        <div className="kx-section-heading">
          <div>
            <p className="kx-kicker">From work mode to your mode</p>
            <h2>
              Good routines
              <br />
              have a starting point.
            </h2>
          </div>
          <p>
            A little intention goes a long way. Here’s a place to begin—not a
            substitute for the device’s operating instructions.
          </p>
        </div>
        <div className="kx-routine-layout">
          <div className="kx-steps">
            {steps.map((s, i) => (
              <button
                key={s.name}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <span>{i + 1}</span>
                <strong>{s.name}</strong>
                <span aria-hidden="true">{step === i ? "−" : "+"}</span>
              </button>
            ))}
          </div>
          <article className="kx-step-content" aria-live="polite">
            <span className="kx-step-big" aria-hidden="true">
              0{step + 1}
            </span>
            <div>
              <h3>{steps[step].title}</h3>
              <p>{steps[step].text}</p>
              <strong className="kx-step-takeaway">{steps[step].detail}</strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export function PackagePicker({
  productPath = "/kneora",
  compact = false,
}: {
  productPath?: string
  compact?: boolean
}) {
  const [bundle, setBundle] = useState(false)
  return (
    <div className={`kx-package-picker ${compact ? "kx-package-compact" : ""}`}>
      <div
        className="kx-package-choices"
        role="group"
        aria-label="Preview package options"
      >
        <button aria-pressed={!bundle} onClick={() => setBundle(false)}>
          <span className="kx-radio" />
          <strong>Device</strong>
          <small>The dual-knee essential</small>
        </button>
        <button aria-pressed={bundle} onClick={() => setBundle(true)}>
          <span className="kx-radio" />
          <strong>Device + gel</strong>
          <small>With separate after-care</small>
        </button>
      </div>
      <div className="kx-package-result" aria-live="polite">
        <h3>
          {bundle
            ? "Kneora Knee Massager + After Care Healing Gel"
            : "Single Kneora Massager"}
        </h3>
        <ul>
          <li>One device with two separate knee channels</li>
          <li>Heat, vibration and air compression</li>
          <li>Red and blue light functions</li>
          {bundle && <li>After-care gel included in this package</li>}
        </ul>
        <p className="kx-fine">
          {bundle
            ? "Gel formulation, size and directions will be provided with the final product details. Do not assume it can be used during device operation."
            : "The same dual-knee device is included in both packages."}
        </p>
      </div>
      {!compact && (
        <LocalizedClientLink
          className="k-button"
          href={`${productPath}#Purchase`}
        >
          Explore this package
        </LocalizedClientLink>
      )}
      <p className="kx-fine kx-pending">
        Package preview · Pricing and availability coming with product setup.
      </p>
    </div>
  )
}

export function SizeExplorer() {
  const [dimension, setDimension] = useState(0)
  const dimensions = [
    { name: "Width", value: "36", mm: "360" },
    { name: "Depth", value: "24.2", mm: "242" },
    { name: "Height", value: "16", mm: "160" },
  ]
  return (
    <section className="kx-size kx-section">
      <div className="k-wrap kx-size-layout">
        <div>
          <p className="kx-kicker">A little more perspective</p>
          <h2>
            Know the size.
            <br />
            Find its place.
          </h2>
          <p>
            The device measures 360 × 242 × 160 mm overall. Explore each
            dimension to picture its footprint at home.
          </p>
          <div className="kx-dimension-buttons" aria-label="Select a dimension">
            {dimensions.map((d, i) => (
              <button
                key={d.name}
                aria-pressed={dimension === i}
                onClick={() => setDimension(i)}
              >
                {d.name}
              </button>
            ))}
          </div>
          <p className="kx-fine">
            Overall measurements describe the outside of the device. Internal
            knee-fitting measurements still need to be confirmed.
          </p>
        </div>
        <div className="kx-measurement" aria-live="polite">
          <div className="kx-measure-rule" />
          <span>{dimensions[dimension].name}</span>
          <strong>
            {dimensions[dimension].value}
            <small>cm</small>
          </strong>
          <p>{dimensions[dimension].mm} mm overall</p>
          <div className="kx-measure-rule" />
        </div>
      </div>
    </section>
  )
}

export function TrustDetails() {
  return (
    <section className="kx-trust kx-section" id="our-approach">
      <div className="k-wrap">
        <div className="kx-section-heading">
          <div>
            <p className="kx-kicker">Confidence comes from clarity</p>
            <h2>
              Less guesswork.
              <br />
              More straight answers.
            </h2>
          </div>
          <p>
            Knowing what you’re choosing matters. Start with the device, the
            package and the details that are relevant to you.
          </p>
        </div>
        <div className="kx-trust-grid">
          <article>
            <span className="kx-trust-mark" aria-hidden="true">
              ✓
            </span>
            <h3>The device, explained.</h3>
            <p>
              One rigid ABS housing, two padded knee channels, a central divider
              and a top-mounted control panel. Clear details, before you choose.
            </p>
            <a href="#functions">Explore the functions</a>
          </article>
          <article>
            <span className="kx-trust-mark" aria-hidden="true">
              ↔
            </span>
            <h3>The packages, compared.</h3>
            <p>
              Both options include the same dual-knee device. The gel package
              adds separate after-care—so you can see exactly what changes.
            </p>
            <a href="#packages">Compare the packages</a>
          </article>
          <article>
            <span className="kx-trust-mark" aria-hidden="true">
              ?
            </span>
            <h3>The questions, welcome.</h3>
            <p>
              Fit, features and getting started should be easy to understand.
              Take a closer look before deciding what belongs in your routine.
            </p>
            <a href="#questions">Read the answers</a>
          </article>
        </div>
        <details className="kx-evidence">
          <summary>What are these product facts based on?</summary>
          <p>
            Device construction and functions come from the private-label
            supplier information; dimensions were provided for this product. We
            have not verified clinical outcome statistics or customer review
            data for Kneora. This page’s numbers describe the device, not
            treatment results. Final instructions and fit specifications will
            accompany the finalized product information.
          </p>
        </details>
      </div>
    </section>
  )
}

export function ProductNumbers() {
  return (
    <section className="kx-numbers" aria-label="Kneora product facts">
      <div className="k-wrap">
        <div>
          <strong>2</strong>
          <span>Knees. Separate channels.</span>
        </div>
        <div>
          <strong>1</strong>
          <span>Device. Shared routine.</span>
        </div>
        <div>
          <strong>5</strong>
          <span>Functions to get to know.</span>
        </div>
        <div>
          <strong>
            36<small>cm</small>
          </strong>
          <span>Overall device width.</span>
        </div>
      </div>
    </section>
  )
}

export function ShiftChecklist() {
  const [checked, setChecked] = useState<string[]>([])
  const items = [
    "Tools packed. Job wrapped.",
    "Work boots off.",
    "Device instructions reviewed.",
    "A comfortable place to settle.",
  ]
  return (
    <section className="kx-checklist kx-section" id="shift-checklist">
      <div className="k-wrap kx-checklist-layout">
        <div>
          <p className="kx-kicker">Your last checklist of the day</p>
          <h2>
            The job is done.
            <br />
            Clock back in
            <br />
            for yourself.
          </h2>
          <p>
            You’ve checked the work. Now give your evening a little attention.
            Tap off your own end-of-shift checklist.
          </p>
          <span className="kx-checklist-note">
            A planning tool for your evening. Your selections stay on this page.
          </span>
        </div>
        <div className="kx-checklist-board">
          <div className="kx-board-heading">
            <strong>After the last job</strong>
            <span aria-live="polite">{checked.length} / 4</span>
          </div>
          <div
            className="kx-progress"
            role="progressbar"
            aria-label="Evening checklist completion"
            aria-valuenow={checked.length}
            aria-valuemin={0}
            aria-valuemax={4}
          >
            <span style={{ width: `${checked.length * 25}%` }} />
          </div>
          {items.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={() =>
                  setChecked((current) =>
                    current.includes(item)
                      ? current.filter((value) => value !== item)
                      : [...current, item]
                  )
                }
              />
              <span>{item}</span>
            </label>
          ))}
          <p aria-live="polite">
            {checked.length === 4
              ? "Work mode, off. This part of the day is yours."
              : "No deadlines here. Make room at your own pace."}
          </p>
          {checked.length > 0 && (
            <button className="kx-reset" onClick={() => setChecked([])}>
              Reset checklist
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export function BrandExperience({ productPath }: { productPath: string }) {
  return (
    <>
      <ProductNumbers />
      <TradeStories />
      <FeatureExplorer />
      <RoutineGuide />
      <ShiftChecklist />
      <section className="kx-packages kx-section" id="packages">
        <div className="k-wrap kx-package-layout">
          <div>
            <p className="kx-kicker">Find your starting point</p>
            <h2>
              One Kneora.
              <br />
              Two ways to
              <br />
              bring it home.
            </h2>
            <p>
              The device stays the same. Choose it on its own or with separate
              after-care gel.
            </p>
            <div className="kx-package-note">
              <strong>Both knees are included.</strong>
              <p>You don’t need a second device for the other knee.</p>
            </div>
          </div>
          <PackagePicker productPath={productPath} />
        </div>
      </section>
      <SizeExplorer />
      <TrustDetails />
    </>
  )
}
