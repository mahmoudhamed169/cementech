"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function LoadingReqTableHead() {
  const headers = [
    "index",
    "requestId",
    "driverName",
    "vehicleNumber",
    "requestStatus",
    "quantity",
    "requestTime",
    "loadingTime",
    "actions",
  ] as const;

  const t = useTranslations("loadingRequestsPage.table.columns");

  console.log(t);
  return (
    <TableHeader>
      <TableRow>
        {headers.map((key) => (
          <TableHead
            key={key}
            className="text-center text-[#364153] font-bold h-11"
          >
            {t(key)}
            {/* {key} */}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
