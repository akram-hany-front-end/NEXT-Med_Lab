export const Roles = {
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  PATIENT: "Patient",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];