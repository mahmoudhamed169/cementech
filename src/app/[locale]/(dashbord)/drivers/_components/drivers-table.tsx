"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyTableState from "@/src/components/shared/empty-tablestate";
import { dummyDrivers } from "@/src/lib/constants/drivers";
import { useTranslations } from "next-intl";
import DriverStatusBadge from "./driver-status-badge";
import LoadingStatusBadge from "./loading-status-badge";
import DocumentStatusBadge from "./document-status-badge";

export default function DriversTable() {
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

  const t = useTranslations("driverPage.driversTable");
  return (
    <Table>
      {/* header */}
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

   

      {/* Body */}
      <TableBody>
        {dummyDrivers.length === 0 ? (
          <EmptyTableState
            colSpan={headers.length}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        ) : (
          dummyDrivers.map((driver, index) => (
            <TableRow
              key={driver.id}
              className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{driver.id}</TableCell>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>
                <DriverStatusBadge status={driver.status} />
              </TableCell>
              <TableCell>
                <LoadingStatusBadge status={driver.loadingStatus} />
              </TableCell>
              <TableCell>
                <DocumentStatusBadge status={driver.documentStatus} />
              </TableCell>
              <TableCell>{driver.ordersCount}</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
