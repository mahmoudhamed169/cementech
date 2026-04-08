import { Permission } from "./get-permissions";
import { permissionPagesMap } from "./permission-pages-map";

const PERMISSION_KEYS = Object.keys(permissionPagesMap) as (keyof Permission)[];
const VISIBLE_COUNT = 3;

export function formatPermissionToCard(
  permission: Permission,
  t: (key: string) => string,
  locale: string,
) {
  const allPages = PERMISSION_KEYS.filter((key) => {
    const val = permission[key];
    return Array.isArray(val) && val.length > 0;
  }).map((key) => t(permissionPagesMap[key]));

  const visiblePages = allPages.slice(0, VISIBLE_COUNT);
  const extraCount = Math.max(0, allPages.length - VISIBLE_COUNT);

  return {
    id: permission.id,
    title: locale === "ar" ? permission.name_ar : permission.name_en,
    description:
      locale === "ar" ? permission.description_ar : permission.description_en,
    assignedCount: permission.user_count,
    pages: visiblePages,
    allPages,
    extraCount,
    isProtected: permission.is_admin,
    variant: permission.is_admin ? ("primary" as const) : undefined,
    permission,
  };
}
