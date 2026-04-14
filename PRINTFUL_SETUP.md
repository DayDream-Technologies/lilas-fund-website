# Printful merchandise checkout

The shop at `/shop` uses **Printful** for fulfillment. The static site (GitHub Pages) only contains public data: it must **never** embed your Printful private API key. Checkout posts order JSON to a separate **serverless** URL (`NEXT_PUBLIC_CHECKOUT_API_URL`), which holds `PRINTFUL_API_KEY` and calls [Printful’s Orders API](https://developers.printful.com/docs/#tag/Orders).

## 1. Variant IDs in `products.json`

Each product in `src/data/products.json` includes **`printfulVariantIds`**: a map from the size label shown in the UI (for example `"M"`, `"YS"`, `"One Size"`) to Printful’s numeric **`variant_id`**.

**How to get real variant IDs**

1. **Printful Dashboard** — Open your synced product, open each variant (size/color), and note the variant ID shown in the URL or product details (wording varies by dashboard version).
2. **Printful API** — Use [Store Products](https://developers.printful.com/docs/#tag/Products) or [Sync Products](https://developers.printful.com/docs/#tag/Store-API) to list variants and IDs for your store.

Replace the **placeholder** IDs in `products.json` (currently `40101…`) with your live catalog IDs. Mismatched IDs will cause order creation to fail at Printful.

Display **prices** on the site should match what you charge; authoritative totals for paid checkout are usually enforced with **Stripe** (or your payment provider) on the server—see optional Stripe below.

## 2. Deploy the serverless handler

An example handler lives at:

`serverless/printful-order/create-order.js`

It accepts `POST` JSON matching `CheckoutRequestBody` in `src/lib/checkout-api.ts`:

```json
{
  "recipient": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1…",
    "address1": "123 Main St",
    "address2": "",
    "city": "Grand Rapids",
    "state_code": "MI",
    "country_code": "US",
    "zip": "49503"
  },
  "items": [
    { "variant_id": 40123456789, "quantity": 1 }
  ]
}
```

**Vercel:** Add the file as a Serverless Function (for example copy `create-order.js` to `api/printful-order.js` in a small Vercel project). Set environment variables:

| Variable | Where | Purpose |
|----------|--------|---------|
| `PRINTFUL_API_KEY` | Server only | Bearer token for `https://api.printful.com/orders` |
| `ALLOWED_ORIGIN` | Server only | Your public site origin for CORS, e.g. `https://www.lilasfund.org` |
| `NEXT_PUBLIC_CHECKOUT_API_URL` | **Static site build** (GitHub Actions secret) | Full URL to this function (e.g. `https://printful-api.vercel.app/api/printful-order`) |

**GitHub Pages build:** Add repository secret `NEXT_PUBLIC_CHECKOUT_API_URL` and pass it into the deploy workflow so the client bundle calls your live API (see `.github/workflows/deploy.yml`).

## 3. CORS

The handler sets `Access-Control-Allow-Origin` from `ALLOWED_ORIGIN`, or reflects the request `Origin` when unset (useful for local dev). For production, set `ALLOWED_ORIGIN` to your exact public origin (scheme + host, no trailing slash).

## 4. Payments (optional Stripe)

Creating a Printful order does **not** charge the customer by itself. Common patterns:

- **Stripe PaymentIntent** on your serverless backend: confirm payment, then create the Printful order (or create a draft order, then confirm after payment—depends on your accounting flow).
- **Printful billing** only — possible for some setups; confirm with Printful account settings.

This repository wires **shipping + line items** to Printful; card processing is intentionally left as a follow-up so you can choose Stripe vs another provider.

## 5. Local development

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_CHECKOUT_API_URL` to your deployed test function, or leave it unset to see the checkout UI message about configuration.
3. Run `npm run dev` and test **Add to cart** → **Cart** → **Checkout**.

## 6. Troubleshooting

| Issue | What to check |
|-------|----------------|
| CORS error in browser | `ALLOWED_ORIGIN` matches the site URL; function deployed over HTTPS |
| 502 from API with Printful details | Invalid `variant_id`, address validation, or API key scope |
| Order created but wrong item | Wrong `printfulVariantIds` mapping in `products.json` |
