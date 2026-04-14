// matching/_components/matching-table-wrapper.tsx
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { MatchingTableBody } from "./matching-table-body";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { DynamicPagination } from "@/src/components/shared/pagination";
import { getDriverFinancialStats } from "@/src/lib/services/payments/matching-stats";


interface Props {
  search?: string;
  status?: string;
  page?: number;
}

export async function MatchingTableWrapper({
  search,
  status,
  page = 1,
}: Props) {
  const { data, meta } = await getDriverFinancialStats({
    page,
    limit: 10,
    search,
    status,
  });

  return (
    <>
      <MatchingTableBody matching={data} />

      {data.length > 0 && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={10}>
              <PaginationInfo
                from={(meta.page - 1) * meta.limit + 1}
                to={Math.min(meta.page * meta.limit, meta.itemCount)}
                total={meta.itemCount}
                type="users"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" colSpan={10}>
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
