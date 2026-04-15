"use client";

import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { PlatformFeeMetrics } from "@/src/lib/services/payments/get-orders-report";
import { useTranslations } from "next-intl";

interface CommissionReportCardProps {
  data: PlatformFeeMetrics;
}

export function CommissionReportCard({ data }: CommissionReportCardProps) {
  const t = useTranslations("PaymentsPage.reports.commission");

  const stats = [
    {
      label: t("bankFee"),
      value: `${data.totalBankFee.toLocaleString()}`,
      color: "text-gray-800",
    },
    {
      label: t("totalCommission"),
      value: `${data.totalCommission.toLocaleString()}`,
      color: "text-gray-800",
    },
    {
      label: t("platformFee"),
      value: `${data.totalPlatformFee.toLocaleString()}`,
      color: "text-green-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-green-100 bg-green-50 p-5 space-y-3">
      <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span
              className={`font-semibold ${stat.color} flex  gap-2 items-center`}
            >
              {stat.value} <CurrencyIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
