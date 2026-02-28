import OrderHeader from "./_components/order-header";
import OrdersStatisctics from "./_components/order-statisctics";
import OrdersList from "./_components/orders-list";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <OrderHeader />
      <OrdersStatisctics />
      {children}
    </main>
  );
}
