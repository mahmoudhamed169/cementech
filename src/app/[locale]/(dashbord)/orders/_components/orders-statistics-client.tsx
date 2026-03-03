"use client";

import { useTranslations } from "next-intl";

interface StatItem {
  key: string;
  value: number;
}

export default function OrdersStatisticsClient({
  statistics,
}: {
  statistics: StatItem[];
}) {
  const t = useTranslations("orders.statistics");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {statistics.map((item) => (
          <OrderStatisticsItem
            key={item.key}
            title={t(item.key)}
            value={item.value}
          />
        ))}
      </div>
    </section>
  );
}

function OrderStatisticsItem({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="h-33 bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between">
      <h4 className="text-sm text-[#4A5565]">{title}</h4>
      <h5 className="font-bold text-2xl text-[#101828]">{value}</h5>
    </div>
  );
}
