import { Table } from "@/components/ui/table";

import { Suspense } from "react";

import TableLoadingSpinner from "@/src/components/shared/table-loading";
import PaymentsTableHeader from "./payments-table-header";
import PaymentsTableWrapper from "./payments-table-wrapper";

export default function PaymentsTable() {
  return (
    <Table>
      {/* Header */}
      <PaymentsTableHeader />

      {/* Body */}
      <Suspense fallback={<TableLoadingSpinner colSpan={9} />}>
        <PaymentsTableWrapper />
      </Suspense>
    </Table>
  );
}
