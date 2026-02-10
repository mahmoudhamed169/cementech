"use client";

import React from "react";
import { ShoppingBag, CreditCard, DollarSign, Calendar } from "lucide-react";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";

interface StatItemProps {
  title: string;
  value: number | string;
  bgColor: string;
  icon: React.ReactNode;
  iconColor: string;
  currency?: React.ReactNode;
}

function StatItem({
  title,
  value,
  bgColor,
  icon,
  iconColor,
  currency,
}: StatItemProps) {
  return (
    <div
      className={`min-h-24 p-4 rounded-xl flex flex-col justify-center gap-4 ${bgColor}`}
    >
      <h6 className="flex items-center gap-2 text-sm text-[#4A5565]">
        <span className={`${iconColor} flex items-center `}>{icon}</span>
        <span>{title}</span>
      </h6>

      <h4 className="font-bold text-2xl flex gap-2 items-center">
        {value} {currency && currency}
      </h4>
    </div>
  );
}

type IProps = {
  totalOrderCount: number;
  totalPaid: number;
};
export default function UserStats({ totalOrderCount, totalPaid }: IProps) {
  // ✅ داتا ثابتة مؤقتًا
  const stats: StatItemProps[] = [
    {
      title: "إجمالي الطلبات",
      value: totalOrderCount,
      bgColor: "bg-[#EFF6FF]",
      icon: <ShoppingBag size={20} />,
      iconColor: "text-[#155DFC]",
    },
    {
      title: "إجمالي المدفوع",
      value: totalPaid,
      currency: <CurrencyIcon height={20} width={20} />,
      bgColor: "bg-[#F0FDF4]",
      icon: <DollarSign size={20} />,
      iconColor: "text-green-600",
    },
    {
      title: "آخر طلب",
      value: "2025-01-24",
      bgColor: "bg-[#FAF5FF]",
      icon: <Calendar size={20} />,
      iconColor: "text-[#9810FA]",
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-[#101828] text-lg">الإحصائيات</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <StatItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
