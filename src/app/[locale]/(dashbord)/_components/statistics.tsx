import {
  CarIcon,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users2,
} from "lucide-react";
import React from "react";
import StatisticsCard from "./statisticscard";

export default function Statistics() {
  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <StatisticsCard
        icon={<DollarSign size={24} strokeWidth={2.5} />}
        iconBg="#00A63E"
        percentage="12.5%"
        trending="up"
        title="مجموع الأرباح"
        value="$45,231"
      />

      <StatisticsCard
        icon={<ShoppingBag size={24} strokeWidth={2.5} />}
        iconBg="#155DFC"
        percentage="3.2%"
        trending="up"
        title="مجموع الطلبات"
        value="1,284"
      />

      <StatisticsCard
        icon={<Users2 size={24} strokeWidth={2.5} />}
        iconBg="#9810FA"
        percentage="7.5%"
        trending="up"
        title="المستخدمين النشطيين"
        value="1,284"
      />

      <StatisticsCard
        icon={<CarIcon size={24} strokeWidth={2.5} />}
        iconBg="#F54900"
        percentage="7.5%"
        trending="down"
        title="السائقين النشطيين"
        value="342"
      />
    </section>
  );
}
