import { Table } from "@/components/ui/table";
import LoadingReqTableHead from "./loading-req-table-head";
import { Suspense } from "react";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import LoadingReqsTableWrapper from "./loadingreqs-table-wrapper";

export default function LoadingRequestsTable({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    time?: string;
    type?: string;
  };
}) {
  return (
    <Table>
      <LoadingReqTableHead />
      <Suspense
        key={`${searchParams.page}-${searchParams.search}-${searchParams.status}-${searchParams.time}`}
        fallback={<TableLoadingSpinner colSpan={9} />}
      >
        <LoadingReqsTableWrapper searchParams={searchParams} />
      </Suspense>
    </Table>
  );
}
