"use client";

import { useTranslations } from "next-intl";
import { DollarSign } from "lucide-react";

export default function PricingTab() {
  const t = useTranslations("settingsPage.tabs.pricing");

  return (
    <div className="space-y-4">
      <div className="text-end">
        <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
        <DollarSign size={40} className="text-gray-300" />
        <p className="text-sm">{t("empty")}</p>
      </div>
    </div>
  );
}
