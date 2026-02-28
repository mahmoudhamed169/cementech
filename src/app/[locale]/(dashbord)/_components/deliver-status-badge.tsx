"use client";

import { cn } from "@/lib/utils";
import { DeliveryStatus } from "@/src/lib/utils/order-status";
import { useTranslations } from "next-intl";

// نحدد الألوان لكل حالة
const deliveryStatusStyles: Record<
  DeliveryStatus,
  { bg: string; text: string }
> = {
  under_review: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  in_preparation: {
    bg: "bg-orange-100",
    text: "text-orange-800",
  },
  delivery: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  deliverd: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  canceled: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
};

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
}

export function DeliveryStatusBadge({ status }: DeliveryStatusBadgeProps) {
  const t = useTranslations("recentOrders.orderStatus");
  const styles = deliveryStatusStyles[status];

  return (
    <span
      className={cn(
        "h-7 px-3 rounded-full text-sm font-medium",
        "inline-flex items-center justify-center whitespace-nowrap",
        "text-sm",
        styles.bg,
        styles.text,
      )}
    >
      {t(status)}
    </span>
  );
}
