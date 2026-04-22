"use client";

import StatsProgress from "./stats-progress";
import { useTranslations } from "next-intl";
import { ApiDriverStats } from "@/src/lib/services/get-driver-stats";

type StatusType = "AVAILABLE" | "IN_DELIVERY" | "WAITING" | "UNAVAILABLE";

const statusTypeMap: Record<string, StatusType> = {
  متاح: "AVAILABLE",
  "جاري التوصيل": "IN_DELIVERY",
  "في انتظار طلب": "WAITING",
  "غير متصل": "UNAVAILABLE",
};

const labelKeyMap: Record<string, string> = {
  متاح: "available",
  "جاري التوصيل": "inDelivery",
  "في انتظار طلب": "waiting",
  "غير متصل": "unavailable",
};

interface Props {
  data: ApiDriverStats;
}

export default function DriversStatus({ data }: Props) {
  const t = useTranslations("driversStatus");

  return (
    <div className="w-2xl p-6 rounded-xl bg-white border border-[#E5E7EB] flex flex-col self-stretch">
      {" "}
      <h2 className="font-bold text-lg text-[#101828] mb-7">{t("title")}</h2>
      <div className="flex flex-col gap-11 border-b pb-8 border-[#E5E7EB] flex-1">
        {data.statuses.map((item) => (
          <StatsProgress
            key={item.status}
            label={t(labelKeyMap[item.status] ?? item.status)}
            value={item.totalDrivers}
            max={data.totalDrivers}
            type={statusTypeMap[item.status] ?? "UNAVAILABLE"}
          />
        ))}
      </div>
      <div className="mt-6">
        <h6 className="text-[#4A5565]">{t("totalDrivers")}</h6>
        <h5 className="font-bold text-2xl text-[#101828]">
          {data.totalDrivers}
        </h5>
      </div>
    </div>
  );
}
