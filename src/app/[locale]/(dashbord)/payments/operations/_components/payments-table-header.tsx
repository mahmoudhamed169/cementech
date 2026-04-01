"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function PaymentsTableHeader() {
  const headers = [
    "index",
    "transactionId",
    "requestId",
    "driverName",
    "clientName",
    "amountPaid",
    "commission",
    "paymentMethod",
    "paymentStatus",
    "transactionDate",
  ] as const;

  const t = useTranslations("PaymentsPage.operations.tableHeaders");
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
