"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function UserOrdersTableHeader() {
  const t = useTranslations("userPage.userOrderTable.colums");

  const headers = [
    "index",
    "orderNumber",
    "data",
    "quantity",
    "orderState",
    "actions",
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
