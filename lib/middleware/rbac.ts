import { NextRequest, NextResponse } from 'next/server';

/**
 * Role-Based Access Control (RBAC) middleware.
 *
 * Roles hierarchy (highest to lowest):
 *   SUPER_ADMIN > ADMIN > MANAGER > STAFF > CUSTOMER > GUEST
 */

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER' | 'GUEST';

export type Permission =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'analytics_access'
  | 'billing_access'
  | 'marketing_access'
  | 'user_management'
  | 'ai_tools'
  | 'content_moderation'
  | 'booking_management';

// ── Permission Matrix ──────────────────────────────────────────────────────

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    'create', 'read', 'update', 'delete',
    'analytics_access', 'billing_access', 'marketing_access',
    'user_management', 'ai_tools', 'content_moderation', 'booking_management',
  ],
  ADMIN: [
    'create', 'read', 'update', 'delete',
    'analytics_access', 'billing_access', 'marketing_access',
    'user_management', 'ai_tools', 'booking_management',
  ],
  MANAGER: [
    'create', 'read', 'update',
    'analytics_access', 'marketing_access', 'booking_management', 'ai_tools',
  ],
  STAFF: [
    'create', 'read', 'update', 'booking_management',
  ],
  CUSTOMER: [
    'read', 'create',
  ],
  GUEST: [
    'read',
  ],
};

// Role hierarchy score for comparisons
const ROLE_LEVEL: Record<Role, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 80,
  MANAGER: 60,
  STAFF: 40,
  CUSTOMER: 20,
  GUEST: 0,
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function isRoleAtLeast(role: Role, minimumRole: Role): boolean {
  return (ROLE_LEVEL[role] ?? 0) >= (ROLE_LEVEL[minimumRole] ?? 0);
}

export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

// ── Middleware factory ─────────────────────────────────────────────────────

export function requireRole(minimumRole: Role) {
  return async function withRoleCheck(
    req: NextRequest,
    handler: (req: NextRequest, userPayload: any) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const { verifyJWT } = await import('@/lib/jwt');
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
      const payload = await verifyJWT(token) as any;
      const userRole = (payload.role as Role) || 'GUEST';

      if (!isRoleAtLeast(userRole, minimumRole)) {
        return NextResponse.json(
          { error: `This action requires ${minimumRole} role or higher` },
          { status: 403 }
        );
      }

      return handler(req, payload);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }
  };
}

export function requirePermission(permission: Permission) {
  return async function withPermissionCheck(
    req: NextRequest,
    handler: (req: NextRequest, userPayload: any) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const { verifyJWT } = await import('@/lib/jwt');
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
      const payload = await verifyJWT(token) as any;
      const userRole = (payload.role as Role) || 'GUEST';

      if (!hasPermission(userRole, permission)) {
        return NextResponse.json(
          { error: `Insufficient permissions. Required: ${permission}` },
          { status: 403 }
        );
      }

      return handler(req, payload);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }
  };
}
