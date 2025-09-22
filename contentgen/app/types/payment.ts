export type PlanName = "BASIC" | "PREMIUM";

export const PLAN_PRICES: Record<PlanName, number> = {
  BASIC: 50000,  // ₹500 (50000 paise)
  PREMIUM: 90000 // ₹900
} as const;