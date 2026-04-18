"use client";

import { TableCell } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { Order } from "@/src/lib/types/orders/order";

interface DriverStatusCellProps {
  order: Order;
}

export default function DriverStatusCell({ order }: DriverStatusCellProps) {
  const t = useTranslations("recentOrders");

  const accepted = order.drivers_counts.accepted;
  const needed = order.truck_quantity;
  const isComplete = accepted >= needed;

  return (
    <TableCell className="text-center">
      {isComplete ? (
        <span className="text-[#364153] font-medium">
          {t("driverStatus.assigned")}
        </span>
      ) : (
        <span className="font-medium text-[#9F0712]">
          ({t("driverStatus.unassigned")})
        </span>
      )}

      {/* Indicator */}
      <p className="text-xs text-[#6A7282] mt-0.5">
        {accepted} / {needed}
      </p>
    </TableCell>
  );
}
