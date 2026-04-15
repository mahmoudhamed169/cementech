"use client";

import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { RevenueMetrics } from "@/src/lib/services/payments/get-orders-report";
import { useTranslations } from "next-intl";      

interface RevenueReportCardProps {
  data: RevenueMetrics;
}

export function RevenueReportCard({ data }: RevenueReportCardProps) {
  const t = useTranslations("PaymentsPage.reports.revenue");

  const stats = [
    {
      label: t("dailyAverage"),
      value: `${data.todayRevenue.toLocaleString()}`,
    },
    {
      label: t("weeklyTotal"),
      value: `${data.weeklyRevenue.toLocaleString()}`,
    },
    {
      label: t("monthlyTotal"),
      value: `${data.monthlyRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 space-y-3">
      <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span className="font-semibold text-gray-800 flex  gap-2 items-center">{stat.value} <CurrencyIcon /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
