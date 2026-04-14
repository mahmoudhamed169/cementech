// payments/_components/stats-row.tsx
"use client";

import { useTranslations } from "next-intl";
import { InvoiceStats } from "@/src/lib/services/payments-stats";
import DashboardStatCard from "../../_components/dashboard-statcard";

interface StatsRowProps {
  stats: InvoiceStats;
}

export function StatsRow({ stats }: StatsRowProps) {
  const t = useTranslations("PaymentsPage.stats");

  const STATS = [
    {
      key: "totalCommission",
      title: t("totalCommission"),
      value: stats.totalCommission,
      color: "text-[#101828]",
    },
    {
      key: "earnedFee",
      title: t("earnedFee"),
      value: stats.earnedFee,
      color: "text-green-600",
    },
    {
      key: "driversMoney",
      title: t("driversMoney"),
      value: stats.driversMoney,
      color: "text-yellow-600",
    },
    {
      key: "bankMoney",
      title: t("bankMoney"),
      value: stats.bankMoney,
      color: "text-red-600",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <DashboardStatCard
            key={stat.key}
            title={stat.title}
            value={stat.value}
            valueColor={stat.color}
          />
        ))}
      </div>
    </section>
  );
}
