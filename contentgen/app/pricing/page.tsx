"use client";

import { PaymentButton } from "@/components/PaymentButton";
import { Button } from "@/components/ui/button";
import { type PlanName } from "@/app/lib/plans";
import { buildUpiUri, getUpiDisplayAmount, getUpiId } from "@/app/lib/upi";
import { useMemo, useState } from "react";

export default function PricingPage() {
  const [upiPlan, setUpiPlan] = useState<Exclude<PlanName, "FREE"> | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const upiUri = useMemo(() => {
    if (!upiPlan) return "";
    return buildUpiUri(upiPlan);
  }, [upiPlan]);

  const upiQrUrl = useMemo(() => {
    if (!upiUri) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
      upiUri
    )}`;
  }, [upiUri]);

  const handleUpiSubmit = async () => {
    if (!upiPlan) return;
    if (!transactionId.trim()) {
      setSubmitError("Please enter the UPI transaction ID.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      const response = await fetch("/api/v1/payment/upi/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: upiPlan,
          transactionId: transactionId.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit payment request.");
      }
      setSubmitSuccess("Payment request submitted. Awaiting approval.");
      setTransactionId("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const PLANS = [
    {
      name: "FREE",
      id: "FREE",
      price: "Rs 0 / month",
      credits: 50,
      description: "Generate up to 50 posts every month for free.",
      features: ["Basic templates", "Standard generation speed", "No priority support"],
      cta: "Start Free",
    },
    {
      name: "PRO",
      id: "PRO",
      price: "Rs 199 / month",
      credits: 400,
      description: "Best for small businesses growing online.",
      features: ["All templates", "Faster generation", "Email support"],
      cta: "Upgrade to Pro",
      badge: "Most Popular",
    },
    {
      name: "BUSINESS",
      id: "BUSINESS",
      price: "Rs 499 / month",
      credits: 1200,
      description: "For teams and brands generating content at scale.",
      features: ["All templates", "Priority generation", "Priority support", "Basic analytics"],
      cta: "Upgrade to Business",
    },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold">Simple pricing for growing businesses</h1>
        <p className="mt-3 text-muted-foreground">
          Generate high-quality posts every month at an affordable price.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border border-border/60 bg-background/70 p-8 shadow-lg transition ${
              plan.id === "PRO" ? "ring-1 ring-primary/40" : ""
            }`}
          >
            {plan.badge ? (
              <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {plan.badge}
              </div>
            ) : null}

            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {plan.name}
            </div>
            <div className="mt-4 text-3xl font-semibold">{plan.price}</div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            <p className="mt-4 text-xs text-muted-foreground">{plan.credits} credits / month</p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {plan.id === "FREE" ? (
                <Button className="w-full">{plan.cta}</Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <PaymentButton plan={plan.id} className="w-full" />
                  <button
                    type="button"
                    onClick={() => {
                      setUpiPlan(plan.id);
                      setSubmitError(null);
                      setSubmitSuccess(null);
                    }}
                    className="w-full rounded-xl border border-border/60 px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
                  >
                    Pay via UPI &amp; Save 5%
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {upiPlan ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-lg rounded-2xl border border-border/60 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <h3 className="text-lg font-semibold">Pay via UPI</h3>
                <p className="text-sm text-muted-foreground">Save 5% on {upiPlan}.</p>
              </div>
              <button
                type="button"
                onClick={() => setUpiPlan(null)}
                className="rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close UPI modal"
              >
                X
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
              <div className="flex flex-col items-center gap-3">
                {upiQrUrl ? (
                  <img src={upiQrUrl} alt="UPI QR code" className="h-[220px] w-[220px]" />
                ) : null}
                <div className="text-xs text-muted-foreground">Scan with any UPI app</div>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    UPI ID
                  </div>
                  <div className="mt-1 font-semibold">{getUpiId()}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Payable Amount
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {getUpiDisplayAmount(upiPlan)}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Transaction ID
                  </label>
                  <input
                    value={transactionId}
                    onChange={(event) => setTransactionId(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Enter UPI transaction ID"
                  />
                </div>
                {submitError ? (
                  <div className="rounded-xl border border-red-300/40 bg-red-50/60 p-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}
                {submitSuccess ? (
                  <div className="rounded-xl border border-emerald-300/40 bg-emerald-50/60 p-3 text-sm text-emerald-700">
                    {submitSuccess}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={handleUpiSubmit}
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Payment Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
