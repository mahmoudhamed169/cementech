"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RolePermissionsModal } from "./role-permissions";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function PermissionHeader() {
  const t = useTranslations("permissionsPage.header");
  const can = usePermissionsStore((s) => s.can);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8]">
      <div className="flex flex-col gap-1.5 justify-center">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-white/80 text-sm">{t("description")}</p>
      </div>
      {mounted && can("management_permission", "POST") && (
        <RolePermissionsModal />
      )}
    </div>
  );
}
