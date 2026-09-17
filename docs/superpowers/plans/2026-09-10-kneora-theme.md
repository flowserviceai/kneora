# Kneora theme implementation plan

**Goal:** Build a native Shopify theme ZIP from the approved storefront brief.
**Architecture:** Liquid sections and JSON templates, a shared CSS design system, progressively enhanced product/cart controls, and merchant-owned catalog data. Source lives in `theme/`; tools, fixtures and documentation stay outside the ZIP.
**Spec:** `deliverables/KNEORA_STOREFRONT_BUILD_PROMPT.md`.

- [x] Implement layout, header/footer, typography, responsive grid and accessible dialogs. Check all linked templates exist.
- [x] Implement product gallery, variant offer cards, sticky purchase summary and Shopify product forms. Test URL-selected variant, selection/price synchronization and sold-out state with DOM fixtures before packaging.
- [x] Implement education, testimonial/app blocks, home, collection, support, policy/page, cart, search, password and 404 templates. Hide unconfigured evidence; use no fabricated prices/reviews/media.
- [x] Validate all Liquid/schema/JSON using Shopify Theme Check; test cart addition/errors and quantity synchronization with mocked server responses, clearly distinct from store checkout testing.
- [x] Render representative templates locally for visual inspection where browser access is available. Record any blocked live-store or visual checks honestly.
- [x] Package only Shopify directories; deliver setup guide, catalog mapping, asset checklist and validation results.

**Constraints:** No live publication, no new image generation, no invented guarantees or medical results. Product geometry is the dual-channel 360 × 242 × 160 mm device. Two catalog variants under the `Package` option are the initial inventory model; bundle component tracking requires merchant configuration.

Visual inspection was attempted but blocked by browser security checks; follow-up Shopify preview checks remain documented in the setup guide.
