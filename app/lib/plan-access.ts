export const PLAN_LEVELS = {
  free: 0,
  starter: 1,
  pro: 2,
  elite: 3,
} as const;

export type UserPlan = keyof typeof PLAN_LEVELS;

export function hasPlanAccess(userPlan: UserPlan, requiredPlan: UserPlan) {
  return PLAN_LEVELS[userPlan] >= PLAN_LEVELS[requiredPlan];
}
