import OrderTable from "../orders/_components/order-table/order.table";
import RecentOrdersSectionHeader from "./recent-orders-section-header";

export default function RecentOrders() {
  return (
    <section className="bg-white min-h-132.5 border-[0.8px] border-[#E5E7EB] rounded-xl p-6 space-y-4">
      <RecentOrdersSectionHeader />

      <OrderTable limit={8} />
    </section>
  );
}
