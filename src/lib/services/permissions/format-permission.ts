import { Permission } from "./get-permissions";
import { permissionPagesMap } from "./permission-pages-map";

const PERMISSION_KEYS = Object.keys(permissionPagesMap) as (keyof Permission)[];
const VISIBLE_COUNT = 3;

export function formatPermissionToCard(
  permission: Permission,
  t: (key: string) => string,
) {
  const pages = PERMISSION_KEYS.filter((key) => {
    const val = permission[key];
    return Array.isArray(val) && val.length > 0;
  }).map((key) => t(permissionPagesMap[key]));

  const visiblePages = pages.slice(0, VISIBLE_COUNT);
  const extraCount = Math.max(0, pages.length - VISIBLE_COUNT);

  return {
    id: permission.id,
    title: permission.name,
    description: permission.description,
    assignedCount: permission.user_count,
    pages: visiblePages,
    extraCount,
    isProtected: permission.is_admin,
    variant: permission.is_admin ? ("primary" as const) : undefined,
    permission,
  };
}
