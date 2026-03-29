import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import InvoicesTableHeader from "./invoices-table-header";
import InvoicesTableWrapper from "./invoices-table-wrapper";
import TableLoadingSpinner from "@/src/components/shared/table-loading";

type InvoicesTableProps = {
  page: number;
  search?: string;
};

export default function InvoicesTable({ page, search }: InvoicesTableProps) {
  return (
    <Table>
      <InvoicesTableHeader />
      <Suspense
        key={`${page}-${search}`}
        fallback={<TableLoadingSpinner colSpan={8} />}
      >
        <InvoicesTableWrapper page={page} search={search} />
      </Suspense>
    </Table>
  );
}
