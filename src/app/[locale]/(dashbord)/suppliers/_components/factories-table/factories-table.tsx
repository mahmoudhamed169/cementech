import React, { Suspense } from "react";
import FactoriesTableHead from "./factories-table-head";
import { Table } from "@/components/ui/table";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import FacotoriesTableWrapper from "./facotories-table-wrapper";

export default function FactoriesTable() {
  return (
    <Table>
      {/* Header */}
      <FactoriesTableHead />

      {/* body */}

      <Suspense fallback={<TableLoadingSpinner colSpan={9} />}>
        <FacotoriesTableWrapper />
      </Suspense>
    </Table>
  );
}
