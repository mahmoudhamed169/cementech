"use client";

import { useTranslations } from "next-intl";
import { OrderData } from "@/src/lib/services/orders/spacific-order";
import { AssigneDriver } from "@/src/components/shared/assigne-driver-dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import DriverCard from "./driver-card";

interface DriverInfoSectionProps {
  order: OrderData;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  ACCEPTED: { label: "مقبول", className: "bg-green-100 text-green-700" },
  PENDING: {
    label: "قيد الانتظار",
    className: "bg-yellow-100 text-yellow-700",
  },
  REJECTED: { label: "مرفوض", className: "bg-red-100 text-red-700" },
  DELIVERED: { label: "تم التسليم", className: "bg-blue-100 text-blue-700" },
};

export default function DriverInfoSection({ order }: DriverInfoSectionProps) {
  const t = useTranslations("orderActions");

  const drivers = order.drivers ?? [];
  const accepted = order.drivers_counts.accepted;
  const remaining = order.truck_quantity - accepted;
  const isCanceled = ["canceled", "ملغي"].includes(order.order_status);

  return (
    <div>
      <h2 className="text-[#101828] font-bold text-xl">{t("driverInfo")}</h2>

      <div className="mt-2 space-y-3">
        {drivers.length > 0 && (
          <div className="grid grid-cols-2 gap-4 text-[#364153]">
            {drivers.map((driver, index) => {
              const suffix = drivers.length > 1 ? ` ${index + 1}` : "";
              const status = statusConfig[driver.status] ?? {
                label: driver.status,
                className: "bg-gray-100 text-gray-700",
              };

              return (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  orderId={order.id}
                  suffix={suffix}
                  isCanceled={isCanceled}
                  status={status}
                />
              );
            })}
          </div>
        )}

        {drivers.length === 0 && remaining <= 0 && (
          <div className="rounded-xl min-h-[68px] p-4 flex justify-between items-center bg-[#FEFCE8]">
            <h6 className="text-[#894B00]">{t("notAssigned")}</h6>
          </div>
        )}

        {remaining > 0 && !isCanceled && (
          <div className="rounded-xl p-4 flex justify-between items-center bg-[#FEFCE8]">
            <h6 className="text-[#894B00]">
              {t("notAssigned")} ({remaining})
            </h6>
            <AssigneDriver
              numOfShipments={remaining}
              orderId={order.id}
              orderCode={order.code}
              productId={order.product_id}
              quantity={order.quantity}
            >
              <Button className="min-w-[130px] min-h-[42px] bg-[#D08700] rounded-xl p-2.5 text-white flex items-center gap-2">
                <UserPlus />
                {t("assignDriver")}
              </Button>
            </AssigneDriver>
          </div>
        )}
      </div>
    </div>
  );
}