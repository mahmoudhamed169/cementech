"use client";

import { useTranslations } from "next-intl";
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

  // show drivers in a two-column grid, each column has name and phone stacked
  return (
    <div>
      <h2 className="text-[#101828] font-bold text-xl">{t("driverInfo")}</h2>

      <div className="mt-2 grid grid-cols-2 gap-4 text-[#364153]">
        {drivers.map((driver, index) => {
          const suffix = drivers.length > 1 ? ` ${index + 1}` : "";

          return (
            <div
              key={index}
              className="space-y-1 bg-[#F0FDF4] backdrop-blur-sm rounded-lg p-3"
            >
              <div className="flex gap-1">
                <span className="font-bold">
                  {t("name")}
                  {suffix}:
                </span>
                <span>{driver.driver_name || "-"}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">
                  {t("phone")}
                  {suffix}:
                </span>
                <span>{driver.phone || "-"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
