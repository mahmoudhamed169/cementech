import { useTranslations } from "next-intl";
import OrderHeader from "./_components/order-header";
import OrdersStatisctics from "./_components/order-statisctics";
import OrdersList from "./_components/orders-list";

export default function OrderPage() {
  const t = useTranslations();

  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <OrderHeader />
      <OrdersStatisctics />
      <OrdersList />
    </main>
  );
}
