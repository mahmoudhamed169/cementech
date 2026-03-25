import {
  getOrderById,
  OrderData,
  OrderResponse,
} from "@/src/lib/services/orders/spacific-order";
import OrderActions from "../order-actions";
import { cookies } from "next/headers";

interface OrderActionsWrapperProps {
  orderId: string;
}

// Server Component
export default async function OrderActionsWrapper({
  orderId,
}: OrderActionsWrapperProps) {
  let order: OrderData | null = null;

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  try {
    const response: OrderResponse = await getOrderById(orderId, locale);
    if (response.success) {
      order = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch order in OrderActionsWrapper:", error);
  }

  if (!order) {
    return null;
  }

  return <OrderActions order={order} />;
}
