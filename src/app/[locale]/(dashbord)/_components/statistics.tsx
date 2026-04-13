import { CarIcon, DollarSign, ShoppingBag, Users2 } from "lucide-react";
import StatisticsCard from "./statisticscard";
import { getTranslations } from "next-intl/server";
import { getStats } from "@/src/lib/services/get-stats";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";

export default async function Statistics() {
  const t = await getTranslations("statistics");
  const stats = await getStats();

  const statisticsConfig = [
    {
      icon: <DollarSign size={24} strokeWidth={2.5} />,
      iconBg: "#00A63E",
      titleKey: "totalRevenue",
      value: (
        <span className="flex items-center gap-1">
          <CurrencyIcon />
          {stats.totalRevenue.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}
        </span>
      ),
    },
    {
      icon: <ShoppingBag size={24} strokeWidth={2.5} />,
      iconBg: "#155DFC",
      titleKey: "totalOrders",
      value: stats.totalOrders.toLocaleString(),
    },
    {
      icon: <Users2 size={24} strokeWidth={2.5} />,
      iconBg: "#9810FA",
      titleKey: "activeUsers",
      value: stats.totalCustomers.toLocaleString(),
    },
    {
      icon: <CarIcon size={24} strokeWidth={2.5} />,
      iconBg: "#F54900",
      titleKey: "activeDrivers",
      value: stats.totalDrivers.toLocaleString(),
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statisticsConfig.map((item, index) => (
        <StatisticsCard
          key={index}
          icon={item.icon}
          iconBg={item.iconBg}
          titleKey={item.titleKey} // ← تأكد إنها titleKey مش title
          value={item.value}
        />
      ))}
    </section>
  );
}
