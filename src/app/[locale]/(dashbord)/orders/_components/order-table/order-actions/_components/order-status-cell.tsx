"use client";

import { DeliveryStatusBadge } from "@/src/app/[locale]/(dashbord)/_components/deliver-status-badge";
import { useTranslations } from "next-intl";

interface OrderStatusCellProps {
  status: string;
}

export default function OrderStatusCell({ status }: OrderStatusCellProps) {
  const t = useTranslations("orderActions");

  return (
    <div className="bg-[#F9FAFB] rounded-xl p-4 flex justify-between items-center min-h-[50px] gap-2">
      <h6 className="text-[#364153] flex-shrink-0">
        {t("orderStatus") || "حالة الطلب"} :
      </h6>

      <DeliveryStatusBadge status={status} />
    </div>
  );
}
