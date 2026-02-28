import OrderTableBody from "./order-body";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";

import { DynamicPagination } from "@/src/components/shared/pagination";
import { getOrders } from "@/src/lib/services/orders/orders";
import type { OrdersResponse } from "@/src/lib/types/orders/order";

export default async function OrdersTableWrapper({
  limit,
}: {
  limit?: number;
}) {
  let data: OrdersResponse["data"] = [];
  let meta: OrdersResponse["meta"] = {
    page: 1,
    limit: limit ?? 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  try {
    const ordersResponse = await getOrders({
      page: 4,
      limit: limit,
      order: "ASC",
      search: "",
      time: "all",
    });

    data = ordersResponse.data;
    meta = ordersResponse.meta;
  } catch (error) {
    console.error("Failed to fetch orders in OrdersTableWrapper:", error);
  }

  const shouldShowPagination = limit !== 8 && data.length > 0;

  return (
    <>
      <OrderTableBody orders={data} />
      {shouldShowPagination && meta && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={9}>
              <PaginationInfo
                from={1}
                to={limit ? Math.min(limit, data.length) : data.length}
                total={meta.itemCount}
                type="orders"
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
