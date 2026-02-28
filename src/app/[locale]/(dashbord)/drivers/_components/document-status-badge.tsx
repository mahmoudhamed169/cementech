"use client";

import { useTranslations } from "next-intl";

type DocumentStatus = "approved" | "rejected" | "pending";

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
    approved: "bg-green-100 text-green-700",
    rejected: "bg-gray-100 text-gray-600",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{t(status)}</span>
  );
}
