"use client";

import { useTranslations } from "next-intl";
import OrderStatusCell from "../../order-status-cell";

interface OrderStatusCellProps {
  status: string;
}

export default function OrderModelStatusCell({ status }: OrderStatusCellProps) {
  const t = useTranslations("orderActions");

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] w-full">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-[#101828] rounded-full" />
        <span className="text-[#101828] font-semibold text-base">
          {t("orderStatus") || "حالة الطلب"}
        </span>
      </div>
      <OrderStatusCell status={status} />
    </div>
  );
}