import { NextResponse } from "next/server";

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;

type CheckoutBody = {
  amountCents?: number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
};

export async function POST(req: Request) {
  if (!PAYMOB_API_KEY || !PAYMOB_INTEGRATION_ID || !PAYMOB_IFRAME_ID) {
    return NextResponse.json(
      { error: "Paymob env vars are missing" },
      { status: 500 }
    );
  }

  try {
    const body: CheckoutBody = await req.json();
    const amountCents = body.amountCents ?? 10000; // 100 EGP as default

    // 1) auth token
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
    });
    const authData = await authRes.json();
    if (!authRes.ok || !authData.token) {
      throw new Error("Failed to get Paymob token");
    }
    const token = authData.token as string;

    // 2) order
    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: "false",
        amount_cents: amountCents,
        currency: "EGP",
        items: [],
      }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.id) {
      throw new Error("Failed to create Paymob order");
    }

    // 3) payment key
    const payKeyRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          apartment: "NA",
          email: body.email ?? "guest@example.com",
          floor: "NA",
          first_name: body.firstName ?? "Guest",
          street: "NA",
          building: "NA",
          phone_number: body.phone ?? "+201000000000",
          shipping_method: "NA",
          postal_code: "NA",
          city: "NA",
          country: "EG",
          last_name: body.lastName ?? "User",
          state: "NA",
        },
        currency: "EGP",
        integration_id: Number(PAYMOB_INTEGRATION_ID),
      }),
    });
    const payKeyData = await payKeyRes.json();
    if (!payKeyRes.ok || !payKeyData.token) {
      throw new Error("Failed to create Paymob payment key");
    }

    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${payKeyData.token}`;

    return NextResponse.json(
      {
        iframeUrl,
        orderId: orderData.id,
        title: body.title ?? "Book purchase",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Paymob checkout error:", err);
    return NextResponse.json(
      { error: "Failed to init Paymob payment" },
      { status: 500 }
    );
  }
}

