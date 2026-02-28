import {
  getOrderById,
  OrderData,
  OrderResponse,
} from "@/src/lib/services/orders/spacific-order";
import OrderActions from "../order-actions";

interface OrderActionsWrapperProps {
  orderId: string;
}

// Server Component
export default async function OrderActionsWrapper({
  orderId,
}: OrderActionsWrapperProps) {
  let order: OrderData | null = null;

  try {
    const response: OrderResponse = await getOrderById(orderId);
    if (response.success) {
      order = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch order in OrderActionsWrapper:", error);
  }

  if (!order) {
    return null;
  }

  // نمرر الداتا للـ Client Component
  return <OrderActions order={order} />;
}
