"use client";

import { cn } from "@/lib/utils";

type DeliveryStatus =
  | "under_review"
  | "in_preparation"
  | "delivery"
  | "delivered"
  | "canceled";

const deliveryStatusConfig: Record<
  DeliveryStatus,
  { bg: string; text: string; label: string }
> = {
  under_review: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "تحت المراجعة",
  },
  in_preparation: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    label: "قيد التجهيز",
  },
  delivery: { bg: "bg-blue-100", text: "text-blue-800", label: "قيد التوصيل" },
  delivered: { bg: "bg-green-100", text: "text-green-800", label: "مكتملة" },
  canceled: { bg: "bg-red-100", text: "text-red-700", label: "ملغاة" },
};

function getStatusConfig(status: string) {
  return (
    deliveryStatusConfig[status as DeliveryStatus] ?? {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status,
    }
  );
}

interface DeliveryStatusBadgeProps {
  status: string;
}

export function DeliveryStatusBadge({ status }: DeliveryStatusBadgeProps) {
  const { bg, text, label } = getStatusConfig(status);

  return (
    <span
      className={cn(
        "h-7 px-3 rounded-full text-sm font-medium",
        "inline-flex items-center justify-center whitespace-nowrap",
        bg,
        text,
      )}
    >
      {label}
    </span>
  );
}
