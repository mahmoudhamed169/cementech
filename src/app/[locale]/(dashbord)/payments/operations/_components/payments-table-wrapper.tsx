// payments-table-wrapper.tsx
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { DynamicPagination } from "@/src/components/shared/pagination";
import { PaymentsTableBody } from "./payments-table-body";
import { getInvoiceReport } from "@/src/lib/services/payments/get-invoice-report";
interface Props {
  page?: number;
  limit?: number;
}

export default async function PaymentsTableWrapper({
  page = 1,
  limit = 10,
}: Props) {
  const { data: payments, meta } = await getInvoiceReport(page, limit);

  return (
    <>
      <PaymentsTableBody payments={payments} />

      {payments.length > 0 && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={9}>
              <PaginationInfo
                from={(meta.page - 1) * meta.limit + 1}
                to={Math.min(meta.page * meta.limit, meta.itemCount)}
                total={meta.itemCount}
                type="invoices"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={meta.pageCount}
                currentPage={meta.page}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}
