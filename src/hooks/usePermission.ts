import { usePermissionsStore } from "@/src/store/permissionsStore";
import { PermissionKey, HttpMethod } from "@/src/lib/types/permissions";

/**
 * Hook لفحص صلاحيات المستخدم
 *
 * @example
 * const { canRead, canCreate, canDelete, canUpdate } = usePermission("order_permission");
 *
 * if (canRead)   → اعرض القائمة
 * if (canCreate) → اعرض زرار إضافة
 * if (canDelete) → اعرض زرار حذف
 */
export function usePermission(resource: PermissionKey) {
  const can = usePermissionsStore((s) => s.can);
  const isAdmin = usePermissionsStore((s) => s.isAdmin);

  return {
    canRead: can(resource, "GET"),
    canCreate: can(resource, "POST"),
    canUpdate: can(resource, "PATCH"),
    canDelete: can(resource, "DELETE"),
    isAdmin: isAdmin(),
    can: (method: HttpMethod) => can(resource, method),
  };
}

/**
 * Hook للفحص اليدوي من غير تحديد resource مسبقاً
 *
 * @example
 * const { check } = usePermissionCheck();
 * check("order_permission", "DELETE")
 */
export function usePermissionCheck() {
  const can = usePermissionsStore((s) => s.can);
  const isAdmin = usePermissionsStore((s) => s.isAdmin);

  return {
    check: (resource: PermissionKey, method: HttpMethod) =>
      can(resource, method),
    isAdmin: isAdmin(),
  };
}
