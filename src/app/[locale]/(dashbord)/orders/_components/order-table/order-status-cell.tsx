"use client";

import { TableCell } from "@/components/ui/table";

import { mapOrderStatus } from "@/src/lib/utils/order-status";
import { DeliveryStatusBadge } from "../../../_components/deliver-status-badge";

import { ApiOrderStatus } from "@/src/lib/utils/order-status";

interface OrderStatusCellProps {
  status: string; // order.order_status may include non-API values
}

export default function OrderStatusCell({ status }: OrderStatusCellProps) {
  return (
    <TableCell className="text-center">
      <DeliveryStatusBadge status={mapOrderStatus(status as ApiOrderStatus)} />
    </TableCell>
  );
}
