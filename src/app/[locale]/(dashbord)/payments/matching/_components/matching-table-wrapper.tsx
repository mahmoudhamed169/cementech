// matching/_components/matching-table-wrapper.tsx
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { MatchingTableBody, STATIC_MATCHING } from "./matching-table-body";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { DynamicPagination } from "@/src/components/shared/pagination";


const currentPage = 1;
const limit = 10;
const total = STATIC_MATCHING.length;
const pageCount = Math.ceil(total / limit);

export function MatchingTableWrapper() {
  return (
    <>
      <MatchingTableBody matching={STATIC_MATCHING} />

      {STATIC_MATCHING.length > 0 && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={10}>
              <PaginationInfo
                from={(currentPage - 1) * limit + 1}
                to={Math.min(currentPage * limit, total)}
                total={total}
                type="users"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" colSpan={10}>
              <DynamicPagination
                totalPages={pageCount}
                currentPage={currentPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}