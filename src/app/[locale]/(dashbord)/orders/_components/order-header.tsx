"use client";

import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";

export default function OrderHeader() {
  const t = useTranslations("orders.header");

  return (
    <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
      <div className="space-x-2">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p>{t("description")}</p>
      </div>

      <div className="flex items-center gap-3">
        <h6>{t("autoAssign")}</h6>
        <Switch />
        <h6>{t("enabled")}</h6>
      </div>
    </div>
  );
}
