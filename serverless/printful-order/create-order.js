/**
 * Vercel Serverless Function (Node.js): deploy as `api/printful-order.js` — see PRINTFUL_SETUP.md.
 *
 * Environment (serverless project only, never in the static site):
 *   PRINTFUL_API_KEY   — Printful private API key
 *   ALLOWED_ORIGIN     — CORS origin (e.g. https://www.lilasfund.org)
 */

function getAllowOrigin(req) {
  const configured = process.env.ALLOWED_ORIGIN?.trim();
  if (configured) return configured;
  const o = req.headers?.origin;
  if (o) return o;
  return "*";
}

function corsHeaders(req) {
  return {
    "Access-Control-Allow-Origin": getAllowOrigin(req),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function badRequest(res, msg, details) {
  res.status(400).json({ ok: false, error: msg, details });
}

module.exports = async function handler(req, res) {
  const h = corsHeaders(req);
  for (const [k, v] of Object.entries(h)) {
    res.setHeader(k, v);
  }

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const key = process.env.PRINTFUL_API_KEY?.trim();
  if (!key) {
    res.status(500).json({ ok: false, error: "PRINTFUL_API_KEY is not configured" });
    return;
  }

  let body;
  try {
    body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
  } catch {
    return badRequest(res, "Invalid JSON body");
  }

  const { recipient, items } = body;

  if (!recipient || typeof recipient !== "object") {
    return badRequest(res, "Missing recipient");
  }
  if (!Array.isArray(items) || items.length === 0) {
    return badRequest(res, "items must be a non-empty array");
  }

  const required = [
    "name",
    "address1",
    "city",
    "state_code",
    "country_code",
    "zip",
  ];
  for (const f of required) {
    if (!recipient[f] || String(recipient[f]).trim() === "") {
      return badRequest(res, `recipient.${f} is required`);
    }
  }

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (
      !it ||
      typeof it.variant_id !== "number" ||
      !Number.isFinite(it.variant_id) ||
      typeof it.quantity !== "number" ||
      it.quantity < 1 ||
      !Number.isInteger(it.quantity)
    ) {
      return badRequest(
        res,
        `Invalid items[${i}]: need variant_id (number) and quantity (positive integer)`
      );
    }
  }

  const printfulBody = {
    recipient: {
      name: String(recipient.name).trim(),
      email: recipient.email ? String(recipient.email).trim() : undefined,
      phone: recipient.phone ? String(recipient.phone).trim() : undefined,
      address1: String(recipient.address1).trim(),
      address2: recipient.address2
        ? String(recipient.address2).trim()
        : undefined,
      city: String(recipient.city).trim(),
      state_code: String(recipient.state_code).trim(),
      country_code: String(recipient.country_code).trim().toUpperCase(),
      zip: String(recipient.zip).trim(),
    },
    items: items.map((it) => ({
      variant_id: it.variant_id,
      quantity: it.quantity,
    })),
  };

  const pfRes = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(printfulBody),
  });

  const pfData = await pfRes.json().catch(() => ({}));

  if (!pfRes.ok) {
    const msg =
      pfData?.error?.message ||
      pfData?.result ||
      `Printful error (${pfRes.status})`;
    return res.status(502).json({
      ok: false,
      error: typeof msg === "string" ? msg : JSON.stringify(msg),
      details: pfData,
    });
  }

  const orderId = pfData?.result?.id ?? pfData?.result?.order?.id;
  res.status(200).json({
    ok: true,
    printfulOrderId: typeof orderId === "number" ? orderId : undefined,
    externalId:
      typeof pfData?.result?.external_id === "string"
        ? pfData.result.external_id
        : undefined,
    message: "Order created",
  });
};
