export type PlanName = "PRO" | "BUSINESS";

export const PLAN_PRICES: Record<PlanName, number> = {
  PRO: 19900,
  BUSINESS: 49900,
} as const;
