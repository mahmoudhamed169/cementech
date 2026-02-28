"use client";

import { useTranslations } from "next-intl";
import DashboardStatCard from "../../_components/dashboard-statcard";
import { driverStatistics } from "@/src/lib/constants/drivers-satistics";

export default function DriverStatistics() {
  const t = useTranslations("driverPage.statistics");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {driverStatistics.map((item) => (
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
