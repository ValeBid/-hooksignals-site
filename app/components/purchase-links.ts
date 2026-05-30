// Canonical checkout routes. Match the [plan] segments in app/checkout/[plan]/page.tsx.
export const purchaseLinks = {
  starter: "/checkout/starter",
  pro: "/checkout/pro",
  elite: "/checkout/elite",
  pricing: "/pricing",
} as const;

export type PurchasePlan = keyof typeof purchaseLinks;
