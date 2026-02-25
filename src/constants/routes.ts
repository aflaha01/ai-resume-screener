import { ROLES } from "./roles";

export const AUTH_ROUTES = {
  login: {
    [ROLES.HR]: "/login?role=HR",
    [ROLES.JOB_SEEKER]: "/login?role=JOB_SEEKER",
  },
  register: {
    [ROLES.HR]: "/register?role=HR",
    [ROLES.JOB_SEEKER]: "/register?role=JOB_SEEKER",
  },
};
