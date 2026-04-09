"use client";

import { useTranslations } from "next-intl";
import DashboardStatCard from "../../_components/dashboard-statcard";
import { UsersStat } from "@/src/lib/services/user-state";

interface SupervisorStatisticsProps {
  stats: UsersStat;
}

const statsConfig = [
  { key: "total", color: "text-[#101828]" },
  { key: "active", color: "text-green-600" },
  { key: "inactive", color: "text-yellow-600" },
  { key: "blocked", color: "text-red-600" },
] as const;

export default function SupervisorStatistics({
  stats,
}: SupervisorStatisticsProps) {
  const t = useTranslations("supervisorsPage.statistics");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsConfig.map((item) => (
          <DashboardStatCard
            key={item.key}
            title={t(item.key)}
            value={stats[item.key]}
            valueColor={item.color}
          />
        ))}
      </div>
    </section>
  );
}
