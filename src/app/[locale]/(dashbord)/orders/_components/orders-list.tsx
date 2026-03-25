import OrderHeaderList from "../../users/_components/order-header-list";
import OrderTable from "./order-table/order.table";

type OrderStatus =
  | "all"
  | "under_review"
  | "in_preparation"
  | "delivery"
  | "delivered"
  | "canceled";
type OrderTime = "today" | "this_week" | "this_month" | "all";

interface OrdersListProps {
  page?: number;
  search?: string;
  status?: string;
  time?: OrderTime;
}

export default function OrdersList({
  page,
  search,
  status,
  time,
}: OrdersListProps) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 space-y-4">
      <OrderHeaderList />
      <div className="flex-1 mt-4">
        <OrderTable
          page={page}
          search={search}
          status={status}
          time={time}
          limit={10}
        />
      </div>
    </section>
  );
}
