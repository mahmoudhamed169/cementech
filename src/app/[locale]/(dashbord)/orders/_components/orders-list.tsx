import { RecentOrdersTable } from "../../_components/recent-orders-table";
import OrderHeaderList from "../../users/_components/order-header-list";
import OrderTable from "./order-table/order.table";

export default function OrdersList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 space-y-4">
      {/* Header */}
      <OrderHeaderList />

      {/* orders table */}
      <div className="flex-1 mt-4">
        {/* هنا الجدول */}
        <OrderTable />
      </div>
    </section>
  );
}
