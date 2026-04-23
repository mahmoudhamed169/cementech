"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function MatchingTableHeader() {
  const t = useTranslations("PaymentsPage.matching.tableHeaders");
  const can = usePermissionsStore((s) => s.can);
  const canView = can("payment_permission", "PATCH");

  const headers = [
    "index",
    "driverId",
    "driverName",
    "completedOrders",
    "totalEarnings",
    "pendingBonus",
    "bonusStatus",
    "lastBonusDate",
    ...(canView ? ["actions"] : []),
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
