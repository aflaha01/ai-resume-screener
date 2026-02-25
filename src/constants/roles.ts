export const ROLES = {
  HR: "HR",
  JOB_SEEKER: "JOB_SEEKER",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
