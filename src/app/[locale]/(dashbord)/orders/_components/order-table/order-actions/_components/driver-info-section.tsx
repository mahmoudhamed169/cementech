"use client";

import { useTranslations } from "next-intl";
import { Order } from "@/src/lib/types/orders/order";
import UnassignedDriverState from "@/src/components/shared/unassigned-driver-state";
import InfoSection from "@/src/components/shared/info-section";

interface DriverInfoSectionProps {
  order: Order;
}

export default function DriverInfoSection({ order }: DriverInfoSectionProps) {
  const t = useTranslations("orderActions");

  return order.has_drivers ? (
    <InfoSection
      title={t("driverInfo")}
      items={order.drivers.map((driver) => ({
        label: driver.driver_name,
        value: driver.code,
      }))}
    />
  ) : (
    <UnassignedDriverState order={order} />
  );
}
