"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface StatisticsCardProps {
  icon: ReactNode;
  iconBg: string;
  titleKey: string;
  value: ReactNode; // ← غيرنا من string | number
}

export default function StatisticsCard({
  icon,
  iconBg,
  titleKey,
  value,
}: StatisticsCardProps) {
  const t = useTranslations("statistics");

  return (
    <div className="bg-white rounded-3xl px-6 pt-6 pb-4 flex flex-col gap-4 border border-gray-200 transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <h6 className="text-[#4A5565]">{t(titleKey)}</h6>
      <h4 className="font-bold text-xl text-[#101828]">{value}</h4>
    </div>
  );
}
