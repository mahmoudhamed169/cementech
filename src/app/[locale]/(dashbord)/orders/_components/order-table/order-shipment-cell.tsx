"use client";

import { TableCell } from "@/components/ui/table";
import { useTranslations } from "next-intl";

interface OrderShipmentCellProps {
  truckQuantity: number;
}

export default function OrderShipmentCell({
  truckQuantity,
}: OrderShipmentCellProps) {
  const t = useTranslations("recentOrders");

  return (
    <TableCell className="text-center">
      {truckQuantity}{" "}
      {truckQuantity === 1 ? t("shipmentLabel.one") : t("shipmentLabel.many")}
    </TableCell>
  );
}
