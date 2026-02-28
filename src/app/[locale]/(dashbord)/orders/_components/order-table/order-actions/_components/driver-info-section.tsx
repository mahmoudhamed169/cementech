"use client";

import { useTranslations } from "next-intl";
import InfoSection from "@/src/components/shared/info-section";
import UnassignedDriverState from "@/src/components/shared/unassigned-driver-state";
import { OrderData } from "@/src/lib/services/orders/spacific-order";

interface DriverInfoSectionProps {
  order: OrderData;
}

export default function DriverInfoSection({ order }: DriverInfoSectionProps) {
  const t = useTranslations("orderActions");

  const drivers = order.drivers ?? [];

  if (!order.has_drivers || drivers.length === 0)
    return <UnassignedDriverState order={order} />;

  const driverItems = drivers.flatMap((driver) => [
    { label: t("name"), value: driver.driver_name || "-" },
    { label: t("phone"), value: driver.phone || "-" },
  ]);

  return <InfoSection title={t("driverInfo")} items={driverItems} />;
}
