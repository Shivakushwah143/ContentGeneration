export type PlanName = "FREE" | "PRO" | "BUSINESS";

export const PLAN_CREDITS: Record<PlanName, number> = {
  FREE: 50,
  PRO: 400,
  BUSINESS: 1200,
};

export const RAZORPAY_PRICES: Record<Exclude<PlanName, "FREE">, number> = {
  PRO: 19900,
  BUSINESS: 49900,
};

export const UPI_PRICES: Record<Exclude<PlanName, "FREE">, number> = {
  PRO: 18900,
  BUSINESS: 46900,
};

export function getPlanCredits(plan: PlanName) {
  return PLAN_CREDITS[plan] ?? PLAN_CREDITS.FREE;
}

export function formatRupees(paise: number) {
  const rupees = Math.round(paise / 100);
  return `Rs ${rupees}`;
}
