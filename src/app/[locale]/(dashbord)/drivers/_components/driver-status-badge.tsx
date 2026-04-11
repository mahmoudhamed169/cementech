"use client";

import { useTranslations } from "next-intl";

export type DriverStatus =
  | "offline"
  | "free"
  | "waiting_order"
  | "delivering"
  | "blocked"
  | "pending";
type DriverStatusBadgeProps = {
  status: DriverStatus;
};

export default function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  const t = useTranslations("driverPage.driverStatus");

  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center";

  const statusStyles: Record<DriverStatus, string> = {
    offline: "bg-gray-100 text-gray-600",
    free: "bg-green-100 text-green-700",
    waiting_order: "bg-yellow-100 text-yellow-700",
    delivering: "bg-blue-100 text-blue-700",
    blocked: "bg-red-100 text-red-700",
    pending: "bg-orange-100 text-orange-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{t(status)}</span>
  );
}
