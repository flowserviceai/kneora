# Kneora foundation audit

Date: September 16, 2026
Application: medusa-storefront (Next.js 15.5.25, Medusa v2 starter adapted for Kneora)
Backend: https://ecomflowservice.medusajs.app

## Verified backend surface

- Health: HTTP 200.
- Regions with supplied storefront key: HTTP 200; US/USD and Europe/EUR.
- Products, collections, product categories: HTTP 200.
- Catalog currently exposes zero products to this key. This does not prove that no unpublished products exist in Admin.
- Collections: knee-relief-devices, gels-and-refills.
- Categories include old apparel categories plus knee-devices/topicals; cleanup can happen during catalog setup.
- Products without a publishable key: HTTP 400 (key required).
- Admin products without admin credentials: HTTP 401.
- CORS preflight for localhost:8000 and an unrelated example origin returns no allow-origin header. Direct browser access is therefore not enabled for these origins. The storefront uses server-side Medusa requests and renders successfully. Review production store/auth origins during deployment.

## Fixes and foundation evidence

- Fixed shipping option types to use the actual Store API response, including nullable stock-location address fields.
- Fixed shipping calculation loading state when no calculated shipping options exist; ignore incomplete responses and stale effect completions.
- Resolved three React hook dependency warnings.
- Fixed product image access before checking whether a product exists.
- Made product rendering explicitly dynamic for request-specific prices, variant selections and cookies.
- Empty checkout redirects to cart instead of showing a missing page.
- Replaced the nonexistent customer-service link with the actual product FAQ anchor.
- Production build and TypeScript validation pass; ESLint reports no warnings/errors. The Next 15 lint command emits a deprecation notice for future Next 16 migration.
- npm audit: zero known vulnerabilities reported for the installed dependency tree at audit time.
- Repeatable check: `npm run check:foundation`, while the production server is running. Fifteen read-only checks pass.

| Storefront route | Result |
| --- | --- |
| / | 307 to /us |
| /us | 200 |
| /us/kneora | 200 |
| /us/cart | 200 |
| /us/account | 200 |
| /us/store | 200 |
| /us/checkout without cart | 307 to /us/cart |
| Nonexistent product URL | 404 |

Browser checks cover homepage rendering, product detail content/tables, FAQ expansion, empty cart, sign-in page and responsive navigation. Product name, photography and prices remain intentionally blank. The product preview is not a purchasable catalog record.

Responsive checks: 390px mobile menu opens, closes on link selection, and navigates to the specification anchor. Product page document width matches the viewport at 390px and 320px; wide comparison tables scroll inside their own containers. Browser console inspection returned no warnings/errors during the final navigation check.

## Next step implemented

Shared brand/navigation: approved second logo; navy/amber palette; desktop product-detail/FAQ links; mobile menu; organized footer; skip-to-content link; visible keyboard focus; improved empty-cart destination; Kneora product metadata. Desktop and mobile visual inspection performed. Full homepage expansion and supporting pages remain subsequent work.

## Limits and deferred work

This is a Store API and storefront audit, not a private infrastructure audit. Database migrations, worker/queue health, backups, private logs, server configuration, provider credentials and authenticated customer permissions cannot be verified from the publishable key. No backend data was changed. No account, cart or order was created.

Live variant selection, inventory, shipping/tax totals, payment, refunds and order email delivery need the real catalog/providers and will be tested after UI/UX approval, as requested. Hosting, production origins, approved policies, real reviews and final media remain launch work. The application runs locally; it has not been deployed publicly.
