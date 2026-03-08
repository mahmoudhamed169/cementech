import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { ApiOrderStatus } from "@/src/lib/utils/order-status";

export interface OrderLog {
  id: string;
  order_id: string;
  actor_id: string;
  created_at: string;
  message: string;
}

export interface Driver {
  id: string;
  driver_name: string;
  code: string;
  phone: string;
}

export interface OrderData {
  id: string;
  code: string;
  payment_method: string;
  payment_method_id: string;
  payment_type: string;
  payment_transaction_id: string;
  customer_id: string;
  address_id: string;
  product_id: string;
  product_name: string;
  factory_name: string;
  address_name: string;
  address_title: string;
  order_status: ApiOrderStatus;
  quantity: number;
  truck_quantity: number;
  total: number;
  created_at: string;
  has_drivers: boolean;
  factory_address: string;
  orderLogs: OrderLog[];
  drivers: Driver[];
  customer_name?: string | null;
  phone?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: OrderData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrderById(orderId: string): Promise<OrderResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "order",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch order. Status: ${res.status}`);
  }

  return res.json() as Promise<OrderResponse>;
}
