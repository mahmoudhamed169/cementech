"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { Driver } from "@/src/lib/services/orders/spacific-order";
import { useUnassignDriver } from "../../../../[id]/_hooks/use-unassign-driver";

interface DriverCardProps {
  driver: Driver;
  orderId: string;
  suffix: string;
  isCanceled: boolean;
  status: { label: string; className: string };
}

export default function DriverCard({
  driver,
  orderId,
  suffix,
  isCanceled,
  status,
}: DriverCardProps) {
  const t = useTranslations("orderActions");
  const { mutate: unassignDriver, isPending: isUnassigning } =
    useUnassignDriver(orderId);

  return (
    <div className="bg-[#F0FDF4] rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#101828]">
          {t("driver")}
          {suffix}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="h-px bg-green-100" />

      <div className="space-y-1.5 text-sm">
        <div className="flex gap-1">
          <span className="font-bold">{t("name")}:</span>
          <span>{driver.driver_name || "-"}</span>
        </div>
        <div className="flex gap-1">
          <span className="font-bold">{t("phone")}:</span>
          <span>{driver.phone || "-"}</span>
        </div>
      </div>

      {driver.status !== "DELIVERED" && !isCanceled && (
        <div className="pt-1 border-t border-green-100 flex justify-end">
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs h-8 px-3"
            disabled={isUnassigning}
            onClick={() => unassignDriver(driver.driver_id)}
          >
            {isUnassigning ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              t("unassignDriver")
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
