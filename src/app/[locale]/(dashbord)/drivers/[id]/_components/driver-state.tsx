import React from "react";
import { ShoppingBag, CreditCard, DollarSign, Calendar } from "lucide-react";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import StatItem from "@/src/components/shared/stat-item";

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
  lastOrderDate: string;
};
export default function DriverStats({
  totalOrderCount,
  totalPaid,
  lastOrderDate,
}: IProps) {
  const stats: StatItemProps[] = [
    {
      title: "اجمالي التوصيلات",
      value: totalOrderCount,
      bgColor: "bg-[#EFF6FF]",
      icon: <ShoppingBag size={20} />,
      iconColor: "text-[#155DFC]",
    },
    {
      title: "اجمالي الأرباح ",
      value: totalPaid,
      currency: <CurrencyIcon height={20} width={20} />,
      bgColor: "bg-[#F0FDF4]",
      icon: <DollarSign size={20} />,
      iconColor: "text-green-600",
    },
    {
      title: "آخر توصيل",
      value: lastOrderDate,
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
