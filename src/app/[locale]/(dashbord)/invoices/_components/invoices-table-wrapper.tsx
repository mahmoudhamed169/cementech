import InvoicesTableBody from "./invoices-table-body";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { getInvoices } from "@/src/lib/services/invoices/get-invoices";

const LIMIT = 10;

type InvoicesTableWrapperProps = {
  page: number;
  search?: string;
  limit?: number;
};

export default async function InvoicesTableWrapper({
  page,
  search,
  limit = LIMIT,
}: InvoicesTableWrapperProps) {
  const res = await getInvoices({ page, limit, search });
  const invoices = res.data.invoices;
  const total = res.data.total;
  const pageCount = Math.ceil(total / limit);

  return (
    <>
      <InvoicesTableBody invoices={invoices} />

      {invoices.length > 0 && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14">
            <TableCell colSpan={8}>
              <PaginationInfo
                from={(page - 1) * limit + 1}
                to={Math.min(page * limit, total)}
                total={total}
                type="invoices"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <DynamicPagination totalPages={pageCount} currentPage={page} />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}
