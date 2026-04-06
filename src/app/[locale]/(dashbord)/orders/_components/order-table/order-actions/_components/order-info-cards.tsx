"use client";

import { useTranslations } from "next-intl";
import { InfoCard } from "@/src/components/shared/info-card";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { OrderData } from "@/src/lib/services/orders/spacific-order";

interface OrderInfoCardsProps {
  order: OrderData;
}

export default function OrderInfoCards({ order }: OrderInfoCardsProps) {
  const t = useTranslations("orderActions");

  return (
    <div
      className="grid gap-3 mt-4 w-full"
      style={{ gridTemplateColumns: "2fr 1fr 1fr 2fr 1.5fr 1.5fr" }}
    >
      <InfoCard label={t("factory")} value={order.factory_name} />
      <InfoCard label={t("truck_quantity")} value={order.truck_quantity} />
      <InfoCard label={t("cementQuantity")} value={`${order.quantity} طن`} />
      <InfoCard label={t("product")} value={order.product_name} />
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