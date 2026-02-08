"use client";

import { Link } from "@/src/i18n/navigation";
import { RecentOrdersTable } from "./recent-orders-table";
import { useTranslations } from "next-intl";

export default function RecentOrders() {
  const t = useTranslations("recentOrders"); // namespace for translations

  return (
    <section className="bg-white min-h-132.5 border-[0.8px] border-[#E5E7EB] rounded-xl p-6 space-y-4">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{t("title")}</h3>
        <Link href="/orders" className="text-[#155DFC] underline">
          {t("viewAll")}
        </Link>
      </div>
      <RecentOrdersTable />
    </section>
  );
}
