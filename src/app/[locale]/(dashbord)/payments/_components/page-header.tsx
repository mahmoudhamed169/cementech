"use client";
import { useTranslations } from "next-intl";

export function PageHeader() {
  const t = useTranslations("PaymentsPage.header");

  return (
    <div className="h-28 flex items-center text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8]">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-sm text-white/80">{t("description")}</p>
      </div>
    </div>
  );
}
