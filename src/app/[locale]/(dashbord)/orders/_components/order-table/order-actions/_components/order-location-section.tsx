"use client";

import { useTranslations } from "next-intl";
import { Order } from "@/src/lib/types/orders/order";
import OrderLocationDetails from "@/src/components/shared/order-location-details";
import { OrderData } from "@/src/lib/services/orders/spacific-order";

interface OrderLocationSectionProps {
  order: Order;
}

export default function OrderLocationSection({
  order,
}: OrderLocationSectionProps) {
  const t = useTranslations("orderActions");

  return (
    <OrderLocationDetails
      title={t("deliveryDetails")}
      locations={[
        {
          title: t("deliveryLocation"),
          address: order.address_title,
          iconColor: "#00A63E",
          iconBgColor: "#DCFCE7",
        },
        {
          title: t("loadingLocation"),
          address: order.address_name || "-",
          iconColor: "#155DFC",
          iconBgColor: "#DBEAFE",
        },
      ]}
    />
  );
}
