export const Roles = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  PATIENT: "patient",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];