"use client";

import { TableCell } from "@/components/ui/table";

import { mapOrderStatus } from "@/src/lib/utils/order-status";
import { DeliveryStatusBadge } from "../../../_components/deliver-status-badge";

interface OrderStatusCellProps {
  status: string; // order.order_status
}

export default function OrderStatusCell({ status }: OrderStatusCellProps) {
  return (
    <TableCell className="text-center">
      <DeliveryStatusBadge status={mapOrderStatus(status)} />
    </TableCell>
  );
}
