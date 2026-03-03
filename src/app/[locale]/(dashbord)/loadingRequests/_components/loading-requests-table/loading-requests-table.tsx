import { Table } from "@/components/ui/table";
import LoadingReqTableHead from "./loading-req-table-head";
import { Suspense } from "react";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import LoadingReqsTableWrapper from "./loadingreqs-table-wrapper";

export default function LoadingRequestsTable() {
  return (
    <div>
      <Table>
        {/* Header */}
        <LoadingReqTableHead />

        {/* body */}

        <Suspense fallback={<TableLoadingSpinner colSpan={9} />}>
          <LoadingReqsTableWrapper />
        </Suspense>
      </Table>
    </div>
  );
}
