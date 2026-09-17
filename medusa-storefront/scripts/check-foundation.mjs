// Read-only checks. Does not create carts, customers, products or orders.
import assert from "node:assert/strict"

const backend = process.env.MEDUSA_BACKEND_URL
const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const storefront = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
assert(backend && key, "Load .env.local before running this check")
const headers = { "x-publishable-api-key": key }

for (const [path, authenticated, expected] of [
  ["/health", false, 200],
  ["/store/regions", true, 200],
  ["/store/products?limit=1", true, 200],
  ["/store/collections", true, 200],
  ["/store/product-categories", true, 200],
  ["/store/products", false, 400],
  ["/admin/products", false, 401],
]) {
  const response = await fetch(backend + path, {
    headers: authenticated ? headers : {},
    signal: AbortSignal.timeout(15000),
  })
  assert.equal(response.status, expected, `Backend ${path}`)
  console.log(`PASS backend ${path}: ${response.status}`)
}

for (const [path, expected, location] of [
  ["/", 307, "/us"],
  ["/us", 200],
  ["/us/kneora", 200],
  ["/us/cart", 200],
  ["/us/account", 200],
  ["/us/store", 200],
  ["/us/checkout", 307, "/us/cart"],
  ["/us/products/nonexistent-kneora-foundation-check", 404],
]) {
  const response = await fetch(storefront + path, {
    redirect: "manual",
    headers: { Cookie: "_medusa_cache_id=foundation-check" },
    signal: AbortSignal.timeout(15000),
  })
  assert.equal(response.status, expected, `Storefront ${path}`)
  if (location) assert.equal(response.headers.get("location"), location)
  console.log(`PASS storefront ${path}: ${response.status}`)
}

console.log("Foundation checks passed. Live purchasing and private backend internals are outside this check.")
