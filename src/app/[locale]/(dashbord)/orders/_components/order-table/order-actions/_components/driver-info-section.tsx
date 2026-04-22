"use client";

import { useTranslations } from "next-intl";
import { OrderData } from "@/src/lib/services/orders/spacific-order";
import { AssigneDriver } from "@/src/components/shared/assigne-driver-dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, Truck } from "lucide-react";
import DriverCard from "./driver-card";

interface DriverInfoSectionProps {
  order: OrderData;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  ACCEPTED: { label: "مقبول", className: "bg-green-100 text-green-700" },
  PENDING: { label: "قيد الانتظار", className: "bg-yellow-100 text-yellow-700" },
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[#101828] font-bold text-xl">{t("driverInfo")}</h2>
          {drivers.length > 0 && (
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {drivers.length}
            </span>
          )}
        </div>

        {remaining > 0 && !isCanceled && (
          <AssigneDriver
            numOfShipments={remaining}
            orderId={order.id}
            orderCode={order.code}
            productId={order.product_id}
            quantity={order.quantity}
          >
            <Button className="h-9 bg-[#D08700] hover:bg-[#b87600] rounded-lg px-4 text-sm text-white flex items-center gap-2 shadow-sm">
              <UserPlus size={15} />
              {t("assignDriver")} ({remaining})
            </Button>
          </AssigneDriver>
        )}
      </div>

      <div className="mt-3">
        {drivers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {drivers.map((driver, index) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                orderId={order.id}
                suffix={drivers.length > 1 ? ` ${index + 1}` : ""}
                isCanceled={isCanceled}
                status={statusConfig[driver.status] ?? { label: driver.status, className: "bg-gray-100 text-gray-700" }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl p-4 flex items-center gap-3 bg-amber-50/80 border border-amber-100">
            <Truck size={18} className="text-amber-500 shrink-0" />
            <p className="text-sm font-medium text-amber-700">{t("notAssigned")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
