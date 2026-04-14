# Square Payment Integration - Migration Guide

This guide walks you through setting up Square for **donations** on the Lila's Fund website. **Merchandise** is fulfilled through Printful; see [PRINTFUL_SETUP.md](PRINTFUL_SETUP.md) for variant IDs and the checkout API.

## Why Square?

- **Competitive rates**: 2.6% + $0.10 per transaction (similar to Wix Payments)
- **Nonprofit program**: Potential fee reductions for registered nonprofits
- **Recurring payments**: Built-in support for monthly donors
- **Free invoicing**: Send branded donor receipts (important for tax-deductible donations)
- **No monthly fees**: Pay only when you process a transaction
- **Dashboard**: Manage orders, inventory, donors, and reports in one place

## Step 1: Create a Square Account

1. Go to [squareup.com/signup](https://squareup.com/signup)
2. Create an account using the Lila's Fund organization email
3. Complete identity verification (EIN, nonprofit documentation)
4. Apply for the **Square for Nonprofits** program if available

## Step 2: Set Up Your Square Dashboard

### Donation Items

Create the following items in **Square Dashboard > Items**:

| Item Name | Price | Notes |
|-----------|-------|-------|
| General Fund Donation | Variable | Allow custom amounts |
| Hug of Hope Fund Donation | Variable | Allow custom amounts |
| Cups of Kindness Fund Donation | Variable | Allow custom amounts |
| Swaddle Drive Fund Donation | Variable | Allow custom amounts |

### Shop products (Printful)

The online store uses **Printful** for inventory and fulfillment, not Square catalog items. Configure products and `variant_id` values in `src/data/products.json` and deploy the checkout API as described in [PRINTFUL_SETUP.md](PRINTFUL_SETUP.md).

### Recurring Payments (Monthly Donors)

1. Go to **Square Dashboard > Subscriptions**
2. Create a subscription plan called "Monthly Supporter"
3. Set up tiers: $10/month, $23/month, $50/month, $100/month
4. The $23 tier is special — it represents the average RMHC stay length

## Step 3: Get API Credentials

1. Go to [developer.squareup.com](https://developer.squareup.com)
2. Sign in with your Square account
3. Click **Applications** > **Create Application**
4. Name it "Lila's Fund Website"
5. Note your **Application ID** and **Location ID**

### Sandbox vs Production

- **Sandbox**: Use for testing (no real charges)
  - Sandbox Application ID starts with `sandbox-`
  - Test credit card: `4532 0000 0000 0000`
- **Production**: Use for live transactions
  - Switch to Production credentials when ready to go live

## Step 4: Configure the Website

### Option A: Square Checkout Links (Recommended for Static Sites)

This is the simplest approach for a GitHub Pages site:

1. In Square Dashboard, go to **Online Checkout > Checkout Links**
2. Create a checkout link for each **donation** tier
3. Wire donation URLs in `src/lib/square.ts` if you use custom links (merchandise uses Printful; see [PRINTFUL_SETUP.md](PRINTFUL_SETUP.md))

### Option B: Square Web Payments SDK (Advanced)

For a more integrated experience (requires a backend or serverless function):

1. Add the Square Web Payments SDK script to your site
2. Create payment forms that tokenize card data
3. Use a serverless function (e.g., Vercel Edge Function) to process payments
4. Note: This approach requires moving off GitHub Pages to a platform that supports server-side code

## Step 5: Set Environment Variables

Add these to your GitHub repository secrets (Settings > Secrets and variables > Actions):

```
SQUARE_APP_ID=your-application-id
SQUARE_LOCATION_ID=your-location-id
```

For local development, create a `.env.local` file:

```
NEXT_PUBLIC_SQUARE_APP_ID=sandbox-your-sandbox-app-id
NEXT_PUBLIC_SQUARE_LOCATION_ID=your-sandbox-location-id
```

## Step 6: Configure Receipts & Branding

1. Go to **Square Dashboard > Account & Settings > Receipts**
2. Add the Lila's Fund logo
3. Customize receipt message (e.g., "Thank you for supporting Lila's Fund!")
4. Include tax-deductible donation language if applicable
5. Enable email receipts for all transactions

## Step 7: Export Data from Wix

Before fully migrating:

1. Export customer data from Wix (Contacts > Export)
2. Export order history from Wix (Orders > Export)
3. Import customer data into Square (Customers > Import)
4. Keep records of all past transactions for accounting

## Step 8: Test Everything

1. Use Square Sandbox credentials
2. Test each donation amount (one-time and recurring)
3. Test merchandise checkout end-to-end using Printful (see [PRINTFUL_SETUP.md](PRINTFUL_SETUP.md))
4. Verify receipts are sent correctly for donations
5. Check that donations appear in Square Dashboard
6. Test on mobile devices

## Step 9: Go Live

1. Switch from Sandbox to Production credentials in GitHub Secrets
2. Trigger a new deployment (push to main or use workflow_dispatch)
3. Process a small test donation with a real card
4. Verify the transaction in Square Dashboard
5. Update DNS if switching from Wix domain

## Cost Comparison

| Feature | Wix Payments | Square |
|---------|-------------|--------|
| Per transaction | 2.9% + $0.30 | 2.6% + $0.10 |
| Monthly fee | $0-$49/mo (depends on plan) | $0 |
| Recurring payments | Included | Included |
| Invoicing | Limited | Free |
| Nonprofit discount | No | Possible |

## Resources

- [Square Developer Documentation](https://developer.squareup.com/docs)
- [Square Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview)
- [Square Checkout API](https://developer.squareup.com/docs/checkout-api)
- [Square for Nonprofits](https://squareup.com/us/en/nonprofits)
- [Square Dashboard](https://squareup.com/dashboard)
