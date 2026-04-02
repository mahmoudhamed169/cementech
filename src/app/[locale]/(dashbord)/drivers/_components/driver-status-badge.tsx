"use client";

import { useTranslations } from "next-intl";

export type DriverStatus = "free" | "offline" | "pending" | "blocked";

type DriverStatusBadgeProps = {
  status: DriverStatus;
};

export default function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  const t = useTranslations("driverPage.driverStatus");

  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center";

  const statusStyles: Record<DriverStatus, string> = {
    free: "bg-green-100 text-green-700",
    offline: "bg-gray-100 text-gray-600",
    pending: "bg-yellow-100 text-yellow-700",
    blocked: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{t(status)}</span>
  );
}
