"use client";

import { useTranslations } from "next-intl";
import { Order } from "@/src/lib/types/orders/order";
import InfoSection from "@/src/components/shared/info-section";

interface CustomerInfoSectionProps {
  order: Order;
}

export default function CustomerInfoSection({
  order,
}: CustomerInfoSectionProps) {
  const t = useTranslations("orderActions");

  return (
    <InfoSection
      title={t("customerInfo")}
      items={[
        { label: t("name"), value: order.customer_name || "-" },
        { label: t("phone"), value: order.phone || "-" },
      ]}
    />
  );
}
