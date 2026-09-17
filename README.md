# Kneora

Current Kneora storefront draft and project references. The active application is **medusa-storefront/**, a Next.js storefront connected to an existing Medusa backend. Backend source is not included yet; it will be integrated after reviewing the business partner's repository and deployment setup.

## Run the storefront

Use Node.js 22 or 24 LTS.

```sh
cd medusa-storefront
npm ci
cp .env.local.example .env.local
# Fill in your publishable API key in .env.local.
npm run dev
```

Open http://localhost:8000/us. The product layout preview is at /us/kneora.

For production verification, run `npm run build`, then `npm start`. In a separate terminal run `npm run check:foundation`. Run `npm run lint` for lint checks.

## Repository contents

- **medusa-storefront/**: active application, interactive contractor-focused UI and approved branding.
- **deliverables/**: research, content, audit reports and setup notes.
- **assets/** and **references/**: brand assets and supplied visual references.
- **STORE_REFERENCES.md**: project reference index.
- **theme/**, **preview/**, **tooling/** and **tests/**: earlier Shopify theme, generated visual previews and associated tools; retained for reference, not the active Medusa storefront.
- **docs/**: previous planning notes.

Product images, final title, prices and payment configuration remain pending. The UI preview does not represent a complete purchasing flow. See `medusa-storefront/KNEORA_SETUP.md` for configuration details.

Local environment files, dependency installations, build caches and generated ZIP packages are intentionally excluded. Use npm's package-lock.json for the active storefront.

Pushing this repository does not itself deploy to Medusa Cloud. The existing backend repository and Cloud project need to be reviewed before connecting a combined deployment.
