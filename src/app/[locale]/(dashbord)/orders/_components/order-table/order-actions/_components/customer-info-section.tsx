"use client";

import { useTranslations } from "next-intl";
import InfoSection from "@/src/components/shared/info-section";
import { OrderData } from "@/src/lib/services/orders/spacific-order";

interface CustomerInfoSectionProps {
  order: OrderData;
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
