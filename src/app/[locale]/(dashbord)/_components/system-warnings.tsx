"use client";
import WarningItem from "./warning-item";
import { useTranslations } from "next-intl";

export default function SystemWarnings() {
  const t = useTranslations("systemWarnings");

  return (
    <div className="min-h-85 bg-white flex-1 border border-[#E5E7EB] rounded-xl px-6 pt-6 flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{t("title")}</h3>

        <span
          className="
    bg-[#FFE2E2] text-[#E7000B]
    h-8
    rounded-full
    text-sm
    px-4
    inline-flex items-center justify-center
    whitespace-nowrap
  "
        >
          {t("urgentCount", { count: 1 })}
        </span>
      </div>

      <div className="space-y-3">
        <WarningItem
          type="urgent"
          title={t("items.manualAssignment", {
            orderId: 1282,
            drivers: 3,
          })}
          time={t("items.minutesAgo", { minutes: 2 })}
        />

        <WarningItem
          type="warning"
          title={t("items.driverDelay", { orderId: 1401 })}
          time={t("items.minutesAgo", { minutes: 10 })}
        />

        <WarningItem
          type="info"
          title={t("items.driverUpdated")}
          time={t("items.hoursAgo", { hours: 1 })}
        />
      </div>
    </div>
  );
}
