"use client";
import { CarIcon, DollarSign, ShoppingBag, Users2 } from "lucide-react";

import StatisticsCard from "./statisticscard";
import { useTranslations } from "next-intl";

const statisticsConfig = [
  {
    icon: <DollarSign size={24} strokeWidth={2.5} />,
    iconBg: "#00A63E",
    percentage: "12.5%",
    trending: "up",
    titleKey: "totalRevenue",
    value: "$45,231",
  },
  {
    icon: <ShoppingBag size={24} strokeWidth={2.5} />,
    iconBg: "#155DFC",
    percentage: "3.2%",
    trending: "up",
    titleKey: "totalOrders",
    value: "1,284",
  },
  {
    icon: <Users2 size={24} strokeWidth={2.5} />,
    iconBg: "#9810FA",
    percentage: "7.5%",
    trending: "up",
    titleKey: "activeUsers",
    value: "1,284",
  },
  {
    icon: <CarIcon size={24} strokeWidth={2.5} />,
    iconBg: "#F54900",
    percentage: "7.5%",
    trending: "down",
    titleKey: "activeDrivers",
    value: "342",
  },
];

export default function Statistics() {
  const t = useTranslations("statistics");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statisticsConfig.map((item, index) => (
        <StatisticsCard
          key={index}
          icon={item.icon}
          iconBg={item.iconBg}
          percentage={item.percentage}
          trending={item.trending}
          title={t(item.titleKey)}
          value={item.value}
        />
      ))}
    </section>
  );
}
