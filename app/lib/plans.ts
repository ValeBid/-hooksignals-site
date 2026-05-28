export const planConfig = {
  starter: {
    name: "Starter",
    price: "$9.99",
    interval: "one-time pack",
    credits: 50,
    trialDays: 1,
    paddlePriceId: "pri_01ksqr6vp07e48ktwm6x5jzw1y",
  },
  pro: {
    name: "Creator Pro",
    price: "$19",
    interval: "month",
    credits: 500,
    trialDays: 7,
    paddlePriceId: "pri_01ksnnbh8fc2452se12nr37tmz",
  },
  elite: {
    name: "Elite",
    price: "$49",
    interval: "month",
    credits: 2000,
    trialDays: 7,
    paddlePriceId: "pri_01ksnn757pd4582jcvn8g0g165",
  },
} as const;

export type PlanKey = keyof typeof planConfig;

export function getPlanByPriceId(priceId: string) {
  return Object.entries(planConfig).find(([, plan]) => plan.paddlePriceId === priceId)?.[1] ?? null;
}
