"use client";

import { useTranslations } from "next-intl";

type DriverStatus = "available" | "unavailable" | "pending" | "banned";

type DriverStatusBadgeProps = {
  status: DriverStatus;
};

export default function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  const t = useTranslations("driverPage.driverStatus");

  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center";

  const statusStyles: Record<DriverStatus, string> = {
    available: "bg-green-100 text-green-700",
    unavailable: "bg-gray-100 text-gray-600",
    pending: "bg-yellow-100 text-yellow-700",
    banned: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{t(status)}</span>
  );
}
