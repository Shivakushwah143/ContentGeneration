import type { PlanName } from "@/app/lib/plans";
import { UPI_PRICES, formatRupees } from "@/app/lib/plans";

const UPI_ID = "9009917146@ptyes";
const PAYEE_NAME = "SoleScript";

export function buildUpiUri(plan: Exclude<PlanName, "FREE">) {
  const amountPaise = UPI_PRICES[plan];
  const amount = (amountPaise / 100).toFixed(0);
  const note = `${plan} Plan`;
  return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(note)}`;
}

export function getUpiDisplayAmount(plan: Exclude<PlanName, "FREE">) {
  return formatRupees(UPI_PRICES[plan]);
}

export function getUpiId() {
  return UPI_ID;
}
