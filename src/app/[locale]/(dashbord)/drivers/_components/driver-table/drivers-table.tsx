import { Table } from "@/components/ui/table";

import { useTranslations } from "next-intl";

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

      <Suspense fallback={<TableLoading colSpan={9} />}>
        <DriversTableWrapper />
      </Suspense>
    </Table>
  );
}
