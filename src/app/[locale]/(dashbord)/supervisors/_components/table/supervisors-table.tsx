import { Table } from "@/components/ui/table";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import { Suspense } from "react";
import SupervisorsTableWrapper from "./supervisors-table-wrapper";
import SupervisorsTableHeader from "./supervisors-table-header";

interface Props {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  };
}

export default function SupervisorsTable({ searchParams }: Props) {
  return (
    <Table>
      <SupervisorsTableHeader />

      <Suspense
        key={JSON.stringify(searchParams)}  
        fallback={<TableLoadingSpinner colSpan={7} />}
      >
        <SupervisorsTableWrapper searchParams={searchParams} />
      </Suspense>
    </Table>
  );
}
