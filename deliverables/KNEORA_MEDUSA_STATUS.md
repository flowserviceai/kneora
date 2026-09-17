# Kneora Medusa migration

Backend: https://ecomflowservice.medusajs.app
Admin: https://ecomflowservice.medusajs.app/app/orders

Updated September 16, 2026. The supplied publishable key is configured in the ignored local environment file. Store API health, regions, catalog endpoints and access boundaries were checked live. No key or permission was changed.

`medusa-storefront/` is a working Next.js/Medusa application with Kneora's approved logo, navy/amber palette, homepage, detailed product preview, responsive navigation and retained cart/account/checkout routes. Production compilation and type validation pass. Shopify assets remain in `theme/` as migration source; the old theme ZIP is not the Medusa application.

Foundation checks pass. The next brand/navigation step has been implemented. Continue with the full homepage, remaining content/support/policy pages and UI refinements. Product name, photos and retail prices remain pending by request; product and payment setup come after UI approval. No deployment or direct AI/admin API connection has been completed. See KNEORA_FOUNDATION_AUDIT.md for evidence and limits.
