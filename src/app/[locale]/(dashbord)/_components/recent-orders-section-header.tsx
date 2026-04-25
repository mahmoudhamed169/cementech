"use client";
import { Link } from "@/src/i18n/navigation";

import { useTranslations } from "next-intl";

export default function RecentOrdersSectionHeader() {
  const t = useTranslations("recentOrders");

  return (
    <div className="flex justify-between">
      <h3 className="font-bold text-lg">{t("title")}</h3>
      <Link href="/orders" className="text-[#155DFC] underline">
        {t("viewAll")}
      </Link>
    </div>
  );
}
