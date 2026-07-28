import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";

const GHL_ENDPOINT = "https://emmy-call-flow-fix.lovable.app/api/public/ghl-lead";

export const createDonationCheckout = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      amount: number;
      frequency: "monthly" | "once";
      email: string;
      name: string;
      phone?: string;
      message?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Stripe is not configured.");
    }

    const origin =
      process.env.SITE_URL || "https://thegenesismoment.com";

    const [firstName, ...rest] = data.name.split(" ");
    const lastName = rest.join(" ") || "—";

    // Forward the lead to GHL in parallel so the donation intent is recorded
    // even if the donor is about to leave for Stripe Checkout.
    const ghlPromise = fetch(GHL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone || "",
        business_name: "The Genesis Moment — Donation",
        website: `${origin}/donate?amount=${data.amount}&freq=${data.frequency}`,
        message: data.message || "",
        amount: data.amount,
        frequency: data.frequency,
        gift_type:
          data.frequency === "monthly" ? "recurring_monthly" : "one_time",
        source: `genesis-moment-donate-${data.frequency}`,
      }),
    }).catch((err) => {
      console.error("GHL lead forward failed:", err);
    });

    const stripe = new Stripe(secretKey, {
      apiVersion: "2025-08-27.basil" as Stripe.LatestApiVersion,
    });

    const existing = await stripe.customers.list({
      email: data.email,
      limit: 1,
    });
    let customerId = existing.data[0]?.id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone || undefined,
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : data.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name:
                data.frequency === "monthly"
                  ? "Monthly Support — The Genesis Moment"
                  : "One-time Support — The Genesis Moment",
              description: data.message?.trim()
                ? `From ${data.name}: ${data.message.trim()}`
                : `Donation from ${data.name}`,
            },
            unit_amount: Math.round(data.amount * 100),
            recurring:
              data.frequency === "monthly"
                ? { interval: "month" }
                : undefined,
          },
          quantity: 1,
        },
      ],
      mode: data.frequency === "monthly" ? "subscription" : "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
      metadata: {
        donor_name: data.name,
        donor_email: data.email,
        donor_phone: data.phone || "",
        message: data.message || "",
        frequency: data.frequency,
      },
    });

    if (!session.url) {
      throw new Error("Stripe session did not return a checkout URL.");
    }

    await ghlPromise;

    return { url: session.url };
  });
