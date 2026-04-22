import { ReactNode } from "react";
import { usePermissionsStore } from "@/src/store/permissionsStore";
import { PermissionKey, HttpMethod } from "@/src/lib/types/permissions";

interface Props {
  resource: PermissionKey;
  method: HttpMethod;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * يخفي أو يعرض الـ children حسب الصلاحية
 *
 * @example
 * <PermissionGuard resource="order_permission" method="DELETE">
 *   <button>حذف</button>
 * </PermissionGuard>
 */
export function PermissionGuard({
  resource,
  method,
  children,
  fallback = null,
}: Props) {
  const can = usePermissionsStore((s) => s.can);
  const isAdmin = usePermissionsStore((s) => s.isAdmin);

  if (isAdmin() || can(resource, method)) return <>{children}</>;
  return <>{fallback}</>;
}

// ─── Shorthand variants ───────────────────────────────────────────────────────
type ShortProps = Omit<Props, "method">;

export const CanRead = (p: ShortProps) => (
  <PermissionGuard {...p} method="GET" />
);
export const CanCreate = (p: ShortProps) => (
  <PermissionGuard {...p} method="POST" />
);
export const CanUpdate = (p: ShortProps) => (
  <PermissionGuard {...p} method="PATCH" />
);
export const CanDelete = (p: ShortProps) => (
  <PermissionGuard {...p} method="DELETE" />
);
