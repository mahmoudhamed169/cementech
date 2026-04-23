"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function UserOrdersTableHeader() {
  const t = useTranslations("userPage.userOrderTable.colums");
  const can = usePermissionsStore((s) => s.can);
  const canViewOrder = can("order_permission", "GET");

  const headers = [
    "index",
    "orderNumber",
    "data",
    "quantity",
    "orderState",
    ...(canViewOrder ? ["actions"] : []),
  ] as const;

  return (
    <TableHeader>
      <TableRow>
        {headers.map((key) => (
          <TableHead
            key={key}
            className="text-center text-[#364153] font-bold h-11"
          >
            {t(key)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
