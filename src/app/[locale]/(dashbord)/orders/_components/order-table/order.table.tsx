import { Table } from "@/components/ui/table";
import OrdersTableHeader from "./orders-table-header";
import { Suspense } from "react";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import OrdersTableWrapper from "./orders-table-wrapper";

type OrderStatus =
  | "all"
  | "under_review"
  | "in_preparation" // ✅
  | "delivery"
  | "delivered" // ✅
  | "canceled"; // ✅

type OrderTime = "today" | "this_week" | "this_month" | "all";

interface OrderTableProps {
  limit?: number;
  page?: number;
  search?: string;
  status?: string;
  time?: OrderTime;
}

export default function OrderTable({
  limit,
  page,
  search,
  status,
  time,
}: OrderTableProps) {
  const suspenseKey = `${page}-${search}-${status}-${time}`;

  return (
    <Table>
      <OrdersTableHeader />
      <Suspense
        key={suspenseKey}
        fallback={<TableLoadingSpinner colSpan={10} />}
      >
        <OrdersTableWrapper
          limit={limit}
          page={page}
          search={search}
          status={status}
          time={time}
        />
      </Suspense>
    </Table>
  );
}
