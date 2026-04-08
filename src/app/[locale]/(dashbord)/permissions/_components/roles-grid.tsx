"use client";

import { useTranslations, useLocale } from "next-intl";
import RoleCard from "./role-card";
import { formatPermissionToCard } from "@/src/lib/services/permissions/format-permission";
import { Permission } from "@/src/lib/services/permissions/get-permissions";

interface Props {
  permissions: Permission[];
}

export default function RolesGrid({ permissions }: Props) {
  const t = useTranslations("sidebar");
  const locale = useLocale();

  const roles = permissions.map((permission) =>
    formatPermissionToCard(permission, t, locale),
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      {roles.map((role) => (
        <RoleCard key={role.id} {...role} />
      ))}
    </div>
  );
}
