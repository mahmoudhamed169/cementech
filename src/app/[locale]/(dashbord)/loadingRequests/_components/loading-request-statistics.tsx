"use client";

import { loadingRequestStatistics } from "@/src/lib/constants/loading-requests-statistics";

import DashboardStatCard from "../../_components/dashboard-statcard";
import { useTranslations } from "next-intl";

export default function LoadingRequestStatistics() {
  const t = useTranslations("loadingRequestsPage.statistics");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loadingRequestStatistics.map((item) => (
          <DashboardStatCard
            key={item.key}
            title={t(item.key)}
            value={item.value}
            valueColor={item.color}
          />
        ))}
      </div>
    </section>
  );
}
