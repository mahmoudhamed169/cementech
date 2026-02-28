"use client";

import { useTranslations } from "next-intl";

type LoadingStatus = "loaded" | "unloaded" | "pending";

type LoadingStatusBadgeProps = {
  status: LoadingStatus;
};

export default function LoadingStatusBadge({
  status,
}: LoadingStatusBadgeProps) {
  const t = useTranslations("driverPage.loadingStatus");

  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center";

  const statusStyles: Record<LoadingStatus, string> = {
    loaded: "bg-green-100 text-green-700",
    unloaded: "bg-gray-100 text-gray-600",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{t(status)}</span>
  );
}
