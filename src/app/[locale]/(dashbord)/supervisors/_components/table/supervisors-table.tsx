import { Table } from "@/components/ui/table";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import React, { Suspense } from "react";
import SupervisorsTableWrapper from "./supervisors-table-wrapper";
import SupervisorsTableHeader from "./supervisors-table-header";

export default function SupervisorsTable() {
  return (
    <Table>
      {/* header */}
      <SupervisorsTableHeader />

      {/* body */}
      <Suspense fallback={<TableLoadingSpinner colSpan={10} />}>
        <SupervisorsTableWrapper />
      </Suspense>
    </Table>
  );
}
