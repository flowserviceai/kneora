# Kneora theme setup

The editable native Shopify theme is in `kneora-theme.zip`. Product name, images and prices are intentionally unfilled. No catalog records were created or changed. The ZIP contains theme source, not products or store settings. The intended store is d0mcjv-p0.myshopify.com.

## Install as a draft

1. In Shopify, open Online Store → Themes → Import theme / Add theme → Upload ZIP file. Upload `kneora-theme.zip`.
2. Open Customize on the uploaded theme. Keep your current theme published while reviewing.
3. Under Theme settings, select the main product when its catalog record is ready. Adjust brand colors, typography and navigation as needed.
4. Create pages for Our story, How it works and Contact. Assign their respective `page.about`, `page.guide` and `page.contact` templates. Add links to the header and footer menus.
5. Review the homepage, product, collection, search, cart and contact pages in Shopify preview on desktop and phone.

## Product setup — leave pending for now

Shopify requires a title when creating a product, so this delivery does not create a blank catalog record. When ready, add the final title, approved images and actual prices in Shopify Products. Select the default product template. The theme reads these values from Shopify automatically; there are no preset selling prices.

Use an option named **Package**, with these two values in order:

| Package | Contents | Price / media |
|---|---|---|
| Single Kneora Massager | One device for both knees | Pending |
| Kneora Knee Massager + After Care Healing Gel | One device plus gel | Pending |

Configure stock, shipping weight, tax, fulfillment and SKU information using confirmed supplier data. A package variant does not automatically synchronize component inventory: configure your bundle/inventory workflow so sales of either package correctly reduce device stock and bundle sales also reduce gel stock. Do not claim the gel heals injuries without appropriate substantiation; the requested package wording remains a catalog decision.

## Page structure and editing

The product template follows the supplied outline: gallery beside headline, four benefits, package choices, purchase controls, reassurance and purchase FAQs; followed by testimonials, evidence/education, product construction, use guide, audience, comparison, technology, more FAQs and a final purchase invitation. On phones the columns stack. The mobile purchase bar appears after the main buy control has scrolled out of view.

Unconfigured testimonials, expert evidence, detailed use instructions and comparisons are hidden from shoppers or show editor-only guidance. Add genuine content before enabling those sections. A review app block is supported in the product section. Set confirmed shipping and return details in Shopify policies and the product reassurance setting. Payment marks reflect the shop’s enabled payment methods.

## Asset and content checklist

- Approved product photographs showing the actual rigid dual-knee geometry, including a true-scale use photo and controls detail. Dimensions: 360 × 242 × 160 mm. No new images were generated.
- Final product title and two package prices; gel packaging, ingredients, instructions and contents.
- Manufacturer instructions, fitting range, session duration, power specifications and verified function details before adding these claims.
- Genuine reviews with permission to use customer images; substantiated expert credentials and evidence if used.
- Real shipping times, return terms, warranty, contact details and required store policies.
- Ad headlines and page introduction aligned to the specific Meta/TikTok campaign. Install tracking through Shopify’s supported channel/customer-event setup and verify consent behavior; this theme does not add advertising scripts.

## Before publishing

Use Shopify preview to check real product media, both package choices, stock states, cart quantities, discounts, shipping/tax and checkout. Test the contact form delivery and all navigation/policy links. Verify mobile layout and accessibility with real content. Place a test order using Shopify’s supported test payment setup. Publish only after those checks and content setup are complete.

## Included files and verification limits

`theme/` is the editable source; the upload ZIP contains the same files at its root. `preview/` contains local design fixtures with blank product title, imagery and prices, not a connected Shopify storefront. Automated checks and limitations are recorded in `KNEORA_VALIDATION.md`.

The correct store connection was verified. The theme has not been uploaded or published, and a live Shopify checkout has not been tested. Browser visual inspection was blocked by the browser tool’s security check, so desktop/mobile appearance still needs review in Shopify preview.
