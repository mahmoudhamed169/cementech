"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function RecentOrdersHeader() {
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
