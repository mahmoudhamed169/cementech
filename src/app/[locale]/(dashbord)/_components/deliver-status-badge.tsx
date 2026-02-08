"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type DeliveryStatus = "delivering" | "completed" | "pending";

const deliveryStatusStyles: Record<
  DeliveryStatus,
  { bg: string; text: string }
> = {
  delivering: {
    bg: "bg-[#DBEAFE]",
    text: "text-[#193CB8]",
  },
  completed: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#016630]",
  },
  pending: {
    bg: "bg-[#FEF9C2]",
    text: "text-[#894B00]",
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
