import RolesGrid from "./_components/roles-grid";
import { getPermissions } from "@/src/lib/services/permissions/get-permissions";

export default async function page() {
  const { data: permissions } = await getPermissions();

  const sorted = [...permissions].sort(
    (a, b) => Number(b.is_admin) - Number(a.is_admin),
  );

  return <RolesGrid permissions={sorted} />;
}
