// delivery-locations/empty-zones.tsx
"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import AddZoneButton from "./add-zone-button";

export default function EmptyZones() {
  const t = useTranslations("settingsPage.tabs.delivery");

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <MapPin size={40} className="text-gray-300" />
      <p className="text-sm text-gray-400">{t("empty")}</p>
    </div>
  );
}
