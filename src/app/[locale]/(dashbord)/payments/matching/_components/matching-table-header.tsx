// matching/_components/matching-table-header.tsx
"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function MatchingTableHeader() {
  const headers = [
    "index",
    "driverId",
    "driverName",
    "completedOrders",
    "totalEarnings",
    "pendingBonus",
    "bonusStatus",
    "lastBonusDate",

    "actions",
  ] as const;

  const t = useTranslations("PaymentsPage.matching.tableHeaders");

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
