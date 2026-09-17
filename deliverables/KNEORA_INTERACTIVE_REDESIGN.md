# Kneora interactive redesign

September 16, 2026

## Direction

Contractor-first, warm and practical. Approved navy #20364B and amber #D5A442 remain the brand anchors, paired with muted workwear green, pale steel and warm sand. Barlow Condensed carries strong display headlines; Manrope handles body copy and controls. Fonts are bundled by Next.js at build time and served with the application.

Reference reviewed: https://gruns.co/ . Adapted its layered product education, prominent factual numbers, product choice controls and repeated opportunities to explore. Kneora uses original wording, graphics and interactions; no competitor customer counts, ratings, guarantees or clinical claims were transferred.

## Implemented

- Contractor-focused hero and original typographic after-work poster.
- Page chapter navigation.
- Confirmed number-led product facts: two knee channels, one device, five listed functions and 36 cm overall width.
- Trade selector: flooring/tile, plumbing/electrical, building/landscaping.
- Five-function explorer with keyboard-accessible tabs and changing visuals/copy.
- Three-part routine planner; no invented treatment duration or settings.
- Interactive end-of-shift checklist with progress, completion copy and reset.
- Package selector and inclusion details. This is preview UI; no products or payments are configured.
- Dimension explorer for width, depth and height.
- Trust section with package clarity, fit questions and an expandable explanation of product fact provenance.
- FAQs and repeated product/routine links.
- Shared education and contractor interactions on the product preview and mapped real-product template.

## Content boundaries

Product facts come from existing project supplier notes and user-provided measurements. There is no verified clinical outcome, customer review or testing dataset for Kneora in this project. No such statistics, testimonials, certifications or policies were fabricated. Product imagery, final title and prices remain unfilled as requested. No instructions imply gel should be used during device operation.

## Local demo

Run `npm run build` then `npm start` from medusa-storefront. Homepage: http://localhost:8000/us ; product preview: http://localhost:8000/us/kneora .

Browser interaction checks verified trade selection, feature selection and arrow-key navigation, routine step selection, checklist progress, package content and dimension switching. The homepage fits a 390px viewport without document overflow. Fonts load successfully; no browser warnings/errors were captured during these checks. Run `npm run check:foundation` to repeat the read-only backend/route checks while the server is running.
