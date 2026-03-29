"use client";

import { useTranslations } from "next-intl";

interface Props {
  isActive: boolean;
}

export default function StatusBadge({ isActive }: Props) {
  const t = useTranslations("suppliersPage");

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
        ${
          isActive
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
            : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
        }
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {isActive ? t("status.active") : t("status.inactive")}
    </span>
  );
}
