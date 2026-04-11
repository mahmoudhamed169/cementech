"use client";

import { TableCell } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type DeliveryStatus =
  | "pending_payment"
  | "under_review"
  | "in_preparation"
  | "delivery"
  | "delivered"
  | "canceled";

const statusMap: Record<string, DeliveryStatus> = {
  "في انتظار الدفع": "pending_payment",
  "تحت المراجعة": "under_review",
  "قيد التجهيز": "in_preparation",
  "قيد التوصيل": "delivery",
  "تم التسليم": "delivered",
  ملغي: "canceled",
};

const statusStyles: Record<DeliveryStatus, { bg: string; text: string }> = {
  pending_payment: { bg: "bg-purple-100", text: "text-purple-800" },
  under_review: { bg: "bg-yellow-100", text: "text-yellow-800" },
  in_preparation: { bg: "bg-orange-100", text: "text-orange-800" },
  delivery: { bg: "bg-blue-100", text: "text-blue-800" },
  delivered: { bg: "bg-green-100", text: "text-green-800" },
  canceled: { bg: "bg-red-100", text: "text-red-700" },
};

interface OrderStatusCellProps {
  status: string;
}

export default function OrderStatusCell({ status }: OrderStatusCellProps) {
  const t = useTranslations("orders.filter.status");

  const normalizedStatus = (statusMap[status] ?? status) as DeliveryStatus;

  const style = statusStyles[normalizedStatus] ?? {
    bg: "bg-gray-100",
    text: "text-gray-800",
  };

  return (
    <TableCell className="text-center">
      <span
        className={cn(
          "h-7 px-3 rounded-full text-sm font-medium",
          "inline-flex items-center justify-center whitespace-nowrap",
          style.bg,
          style.text,
        )}
      >
        {t(normalizedStatus)}
      </span>
    </TableCell>
  );
}
