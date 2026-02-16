"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function DriversTableHeader() {
  const t = useTranslations("driverPage.driversTable");

  const headers = [
    "index",
    "driverId",
    "driverName",
    "phoneNumber",
    "status",
    "loadingStatus",
    "documentStatus",
    "ordersCount",
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
            {t(`columns.${key}`)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
