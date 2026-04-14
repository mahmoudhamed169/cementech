// payments-table.tsx

import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import PaymentsTableHeader from "./payments-table-header";
import PaymentsTableWrapper from "./payments-table-wrapper";

interface Props {
  search?: string;
  status?: string;
  timeRange?: string;
  date?: string;
  page?: number;
}

export default function PaymentsTable({
  search,
  status,
  timeRange,
  date,
  page = 1,
}: Props) {
  return (
    <Table>
      <PaymentsTableHeader />
      <Suspense fallback={<TableLoadingSpinner colSpan={9} />}>
        <PaymentsTableWrapper
          search={search}
          status={status}
          timeRange={timeRange}
          date={date}
          page={page}
        />
      </Suspense>
    </Table>
  );
}
