import { Orders } from "@/src/lib/constants/order";
import OrderTableBody from "./order-body";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";

import { DynamicPagination } from "@/src/components/shared/pagination";

export default function OrdersTableWrapper({ limit }: { limit?: number }) {
  const shouldShowPagination = limit !== 8 && Orders.length > 0;

  return (
    <>
      <OrderTableBody />

      {shouldShowPagination && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={9}>
              <PaginationInfo
                from={1}
                to={limit ? Math.min(limit, Orders.length) : Orders.length}
                total={Orders.length}
                type="orders"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={Math.ceil(Orders.length / 8)}
                currentPage={1}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}
