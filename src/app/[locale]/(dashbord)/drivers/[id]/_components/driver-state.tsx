"use client";
import React from "react";
import { ShoppingBag, DollarSign, Calendar } from "lucide-react";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import StatItem from "@/src/components/shared/stat-item";
import { useTranslations } from "next-intl";

interface StatItemProps {
  title: string;
  value: number | string;
  bgColor: string;
  icon: React.ReactNode;
  iconColor: string;
  currency?: React.ReactNode;
}

type IProps = {
  totalOrderCount: number;
  totalPaid: number;
  lastOrderDate: Date | string;
  noOrdersText: string;
};

export default function DriverStats({
  totalOrderCount,
  totalPaid,
  lastOrderDate,
  noOrdersText,
}: IProps) {
  const t = useTranslations("driverPage.driverStats");

  const stats: StatItemProps[] = [
    {
      title: t("totalOrders"),
      value: totalOrderCount,
      bgColor: "bg-[#EFF6FF]",
      icon: <ShoppingBag size={20} />,
      iconColor: "text-[#155DFC]",
    },
    {
      title: t("totalPaid"),
      value: totalPaid.toFixed(2),
      currency: <CurrencyIcon height={20} width={20} />,
      bgColor: "bg-[#F0FDF4]",
      icon: <DollarSign size={20} />,
      iconColor: "text-green-600",
    },
    {
      title: t("lastOrderDate"),
      value:
        lastOrderDate instanceof Date
          ? new Intl.DateTimeFormat("en-GB", {
              numberingSystem: "latn",
            }).format(lastOrderDate)
          : noOrdersText,
      bgColor: "bg-[#FAF5FF]",
      icon: <Calendar size={20} />,
      iconColor: "text-[#9810FA]",
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-[#101828] text-lg">{t("title")}</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <StatItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
