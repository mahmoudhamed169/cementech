"use client";

import { useTranslations } from "next-intl";

export type DocumentStatus = "accepted" | "rejected" | "pending";

type DocumentStatusBadgeProps = {
  status: DocumentStatus;
};

export default function DocumentStatusBadge({
  status,
}: DocumentStatusBadgeProps) {
  const t = useTranslations("driverPage.documentStatus");

  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center";

  const statusStyles: Record<DocumentStatus, string> = {
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{t(status)}</span>
  );
}
