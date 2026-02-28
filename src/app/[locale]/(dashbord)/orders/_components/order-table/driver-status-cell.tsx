"use client";

import { TableCell } from "@/components/ui/table";
import { useTranslations } from "next-intl";

interface DriverStatusCellProps {
  hasDrivers: boolean;
}

export default function DriverStatusCell({
  hasDrivers,
}: DriverStatusCellProps) {
  const t = useTranslations("recentOrders");

  return (
    <TableCell className="text-center">
      {hasDrivers ? (
        <span className="text-[#364153] font-medium">
          {t("driverStatus.assigned")}
        </span>
      ) : (
        <span className="font-medium text-[#9F0712]">
          ({t("driverStatus.unassigned")})
        </span>
      )}
    </TableCell>
  );
}
