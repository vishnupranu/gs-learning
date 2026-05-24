export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
  GUEST: 'GUEST',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ADMIN_ROLES: Role[] = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER];
export const STAFF_ROLES: Role[] = [...ADMIN_ROLES, ROLES.STAFF];

export function isAdmin(role?: string): boolean {
  return ADMIN_ROLES.includes(role as Role);
}

export function isStaff(role?: string): boolean {
  return STAFF_ROLES.includes(role as Role);
}
