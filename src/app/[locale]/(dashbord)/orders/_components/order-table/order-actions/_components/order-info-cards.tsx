"use client";

import { useTranslations } from "next-intl";
import { Order } from "@/src/lib/types/orders/order";
import { InfoCard } from "@/src/components/shared/info-card";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";

interface OrderInfoCardsProps {
  order: Order;
}

export default function OrderInfoCards({ order }: OrderInfoCardsProps) {
  const t = useTranslations("orderActions");

  return (
    <div className="flex gap-3 mt-4 w-full">
      <InfoCard label={t("factory")} value={order.factory_name} />
      <InfoCard
        label={t("cementQuantity")}
        value={`${order.truck_quantity} طن`}
      />
      <InfoCard
        label={t("price")}
        value={order.total}
        icon={<CurrencyIcon />}
      />
      <InfoCard
        label={t("lastUpdate")}
        value={<TimeAgo time={order.created_at} />}
      />
    </div>
  );
}
