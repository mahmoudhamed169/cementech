"use client";

import StatsProgress from "./stats-progress";
import { useTranslations } from "next-intl";

const driversStatusConfig = [
  {
    labelKey: "available",
    value: 156,
    type: "AVAILABLE",
  },
  {
    labelKey: "inDelivery",
    value: 89,
    type: "IN_DELIVERY",
  },
  {
    labelKey: "unavailable",
    value: 180,
    type: "UNAVAILABLE",
  },
];

export default function DriversStatus() {
  const t = useTranslations("driversStatus");
  const max = 342;

  return (
    <div className="w-lg p-6 rounded-xl min-h-85 bg-white border border-[#E5E7EB]">
      <h2 className="font-bold text-lg text-[#101828] mb-4">{t("title")}</h2>

      <div className="flex flex-col gap-6 border-b pb-8 border-[#E5E7EB]">
        {driversStatusConfig.map((item) => (
          <StatsProgress
            key={item.type}
            label={t(item.labelKey)}
            value={item.value}
            max={max}
            type={item.type}
          />
        ))}
      </div>

      <div className="mt-6">
        <h6 className="text-[#4A5565]">{t("totalDrivers")}</h6>
        <h5 className="font-bold text-2xl text-[#101828]">{max}</h5>
      </div>
    </div>
  );
}
