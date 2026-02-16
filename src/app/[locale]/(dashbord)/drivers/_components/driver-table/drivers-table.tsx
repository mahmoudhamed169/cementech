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
import DriverStatusBadge from "../driver-status-badge";
import LoadingStatusBadge from "../loading-status-badge";
import DocumentStatusBadge from "../document-status-badge";
import DriversTableHeader from "./drivers-table-header";
import DriversTableWrapper from "./drivers-table-wrapper";
import { Suspense } from "react";
import TableLoading from "@/src/components/shared/table-loading";

export default function DriversTable() {
  const t = useTranslations("driverPage.driversTable");
  return (
    <Table>
      {/* header */}
      <DriversTableHeader />

      {/* Body */}
      {/* <TableLoading colSpan={9}  /> */}
      <Suspense fallback={<TableLoading colSpan={9} />}>
        <DriversTableWrapper />
      </Suspense>
    </Table>
  );
}
