import { Orders } from "@/src/lib/constants/order";
import OrderTableBody from "./order-body";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";

import { DynamicPagination } from "@/src/components/shared/pagination";
import { getOrders } from "@/src/lib/services/orders/orders";

export default async function OrdersTableWrapper({
  limit,
}: {
  limit?: number;
}) {
  const shouldShowPagination = limit !== 8 && Orders.length > 0;

  const ordersResponse = await getOrders({
    page: 1,
    limit: limit || 10,
    order: "ASC",
    search: "",

    time: "all",
  });

  console.log(ordersResponse);

  const { data, meta } = ordersResponse;

  return (
    <>
      <OrderTableBody orders={data} />
      {shouldShowPagination && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={9}>
              <PaginationInfo
                from={1}
                to={limit ? Math.min(limit, data.length) : data.length}
                total={data.length}
                type="orders"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={Math.ceil(data.length / 8)}
                currentPage={1}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}
