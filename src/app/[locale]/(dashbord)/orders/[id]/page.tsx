// app/orders/[id]/page.tsx
import {
  getOrderById,
  OrderData,
  OrderResponse,
} from "@/src/lib/services/orders/spacific-order";
import OrderDialogTitle from "../_components/order-table/order-actions/_components/order-dialog-title";
// import OrderStatusCell from "../_components/order-table/order-status-cell";
import CustomerInfoSection from "../_components/order-table/order-actions/_components/customer-info-section";
import DriverInfoSection from "../_components/order-table/order-actions/_components/driver-info-section";
import OrderLocationSection from "../_components/order-table/order-actions/_components/order-location-section";
import OrderInfoCards from "../_components/order-table/order-actions/_components/order-info-cards";
import OrderCancelButton from "../_components/order-table/order-actions/_components/order-cancel-button";
import { cookies } from "next/headers";
import OrderPageTitle from "./_components/order-page-title";
import OrderdetailsStatusCell from "../_components/order-table/order-actions/_components/order-details-status-cell";
import OrderFetchError from "./_components/order-fetch-error";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let order: OrderData | null = null;
  const { id } = await params; // 👈 await هنا

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  try {
    const response: OrderResponse = await getOrderById(id, locale);
    if (response.success) {
      order = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch order:", error);
  }

  if (!order)
    return (
      <div className="p-6 space-y-6 bg-white rounded-2xl">
        <OrderPageTitle />
        <OrderFetchError />
      </div>
    );

  return (
    <div className="p-6 space-y-11 bg-white rounded-2xl min-h-screen">
      <OrderPageTitle orderCode={order.code} />
      <OrderdetailsStatusCell status={order.order_status} />

      <CustomerInfoSection order={order} />
      <DriverInfoSection order={order} />

      <OrderLocationSection order={order} />
      <OrderInfoCards order={order} />

      {!["canceled", "ملغي"].includes(order.order_status) && (
        <div className="flex justify-center">
          <OrderCancelButton id={order.id} />
        </div>
      )}
    </div>
  );
}
