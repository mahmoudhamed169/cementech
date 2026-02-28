"use client";

import { TableCell } from "@/components/ui/table";
import { useTranslations } from "next-intl";

interface OrderQuantityCellProps {
  quantity: number;
}

export default function OrderQuantityCell({
  quantity,
}: OrderQuantityCellProps) {
  const t = useTranslations("recentOrders");

  return (
    <TableCell className="text-center">
      {quantity} {quantity === 1 ? t("weightUnit.one") : t("weightUnit.many")}
    </TableCell>
  );
}
