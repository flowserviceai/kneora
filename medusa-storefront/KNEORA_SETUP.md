# Kneora Medusa storefront

This is a Next.js storefront based on Medusa's official v2 starter, with Kneora branding and product content migrated from the Shopify theme. The backend is https://ecomflowservice.medusajs.app. This application is deployed separately from Medusa Admin; it is not a theme ZIP import.

## Run locally

Use Node 22 or 24 LTS. Run `npm ci`, copy `.env.local.example` to `.env.local`, fill the publishable key, and run `npm run dev`. The configured workspace already has its local key. Never commit `.env.local`. Open http://localhost:8000/us.

## Current routes

- `/us`: Kneora homepage, approved second logo, navy/amber palette.
- `/us/kneora`: product layout preview with feature descriptions, specifications, package comparison and FAQs. Product title, photos and prices intentionally blank. Purchasing is disabled on this preview.
- `/us/products/[handle]`: real Medusa products. Set `NEXT_PUBLIC_KNEORA_PRODUCT_HANDLE` to the actual massager handle to use the Kneora product layout with Medusa variant/cart controls.
- `/us/cart`, `/us/checkout`, `/us/account`: upstream Medusa commerce flows retained. They require backend payment, fulfillment and catalog configuration.

Source copy is in `src/modules/kneora/product-content.json`; React sections are in `src/modules/kneora/index.tsx`. There is no Shopify section editor in this implementation. Review and usage sections remain unpopulated pending real content. The current migration includes home/product/cart/account navigation; additional support/story/policy pages remain to be implemented before launch.

## Backend setup

Store API connection verified September 16, 2026 with the supplied publishable key. Regions include US/USD and Europe/EUR. The key currently exposes zero products. Collections include knee-relief-devices and gels-and-refills; categories contain both apparel starter categories and knee-devices/topicals. No backend records were changed or removed during this audit.

For repeatable read-only verification, start the production app with `npm run build` then `npm start`, and in another terminal run `npm run check:foundation`. This checks backend health/access and storefront route behavior without creating records. Run `npm run lint` separately. Direct localhost browser requests currently receive no CORS allow-origin header; the current storefront's server-side API requests work. Review allowed origins when hosting is selected.

When ready, create the real product with the two package options, actual prices, stock and approved media. Link it to the sales channel associated with the publishable key. Map the handle in the frontend environment. Configure bundle stock/fulfillment so device and gel inventories stay correct.

## Deployment

Deploy this source to a Node-compatible Next.js host using `npm ci` and `npm run build`; start with `npm start`. Configure the environment values from `.env.local.example` in the host. Set `NEXT_PUBLIC_BASE_URL` to the real storefront origin. Set a strong private revalidation secret. Add the frontend origin to Medusa's required store/auth CORS settings. Configure the actual product image hostname for Next image optimization. Complete payment/fulfillment setup and perform test orders before connecting the public domain.

No remote deployment, payment test or admin API integration has been completed. A publishable key connects the storefront Store API; it does not let an assistant manage products/orders through the Admin API. The Medusa documentation MCP connection is separate and remains pending if wanted.

Use npm and its package-lock.json for this adapted project. The original yarn.lock is retained as upstream provenance, not the installation lock for this delivery.
