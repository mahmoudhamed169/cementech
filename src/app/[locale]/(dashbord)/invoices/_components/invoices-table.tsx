import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import InvoicesTableHeader from "./invoices-table-header";
import InvoicesTableWrapper from "./invoices-table-wrapper";
import TableLoadingSpinner from "@/src/components/shared/table-loading";

type InvoicesTableProps = {
  page: number;
  search?: string;
  invoiceType: string;
};

export default function InvoicesTable({
  page,
  search,
  invoiceType,
}: InvoicesTableProps) {
  return (
    <Table>
      <InvoicesTableHeader invoiceType={invoiceType} />
      <Suspense
        key={`${page}-${search}-${invoiceType}`}
        fallback={<TableLoadingSpinner colSpan={8} />}
      >
        <InvoicesTableWrapper
          page={page}
          search={search}
          invoiceType={invoiceType}
        />
      </Suspense>
    </Table>
  );
}
