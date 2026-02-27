import {
  getOrderById,
  OrderResponse,
} from "@/src/lib/services/orders/spacific-order";
import { Order } from "@/src/lib/types/orders/order";
import { OrderActions } from "../order-actions";

interface OrderActionsWrapperProps {
  orderId: string;
}

// Server Component
export default async function OrderActionsWrapper({
  orderId,
}: OrderActionsWrapperProps) {
  console.log(orderId);
  let order: Order | null = null;

  const response: OrderResponse = await getOrderById(orderId);

  console.log(response);

  // نمرر الداتا للـClient Component
  return <OrderActions order={order}  />;
}
