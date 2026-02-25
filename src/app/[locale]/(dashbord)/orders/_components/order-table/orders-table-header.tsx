"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function OrdersTableHeader() {
  const t = useTranslations("recentOrders");
  const headers = [
    "index",
    "orderId",
    "customer",
    "driverStatus",
    "deliveryStatus",
    "shipments",
    "quantity",
    "price",
    "time",
    "actions",
  ];
  return (
    <TableHeader>
      <TableRow>
        {headers.map((key) => (
          <TableHead
            key={key}
            className="text-center text-[#364153] font-bold h-11"
          >
            {t(`header.${key}`)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
