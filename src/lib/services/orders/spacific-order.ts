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
  driver_id: string;
  driver_name: string;
  code: string;
  phone: string;
  status: "ACCEPTED" | "PENDING" | "REJECTED" | "DELIVERED";
}

export interface DriversCount {
  pending: number;
  accepted: number;
  rejected: number;
  delivered: number;
  total_assigned: number;
}

export interface ExtraFee {
  id: string;
  name_en: string;
  name_ar: string;
  amount: number;
  fee_type: string;
}

export interface Invoice {
  id: string;
  code: string;
  order_id: string;
  request_id: string | null;
  total_amount: number;
  extra_fees: ExtraFee[];
  qr_token: string;
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
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
  factory_address: string;
  address_name: string;
  address_lat: string;
  address_lng: string;
  address_title: string;
  order_status: ApiOrderStatus;
  quantity: number;
  truck_quantity: number;
  total: number;
  created_at: string;
  updated_at: string;
  invoice_id: string;
  invoice_status: string;
  has_drivers: boolean;
  drivers_counts: DriversCount;
  orderLogs: OrderLog[];
  drivers: Driver[];
  invoice: Invoice;
  customer_name?: string | null;
  phone?: string;
  payment_deeplink?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: OrderData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrderById(
  orderId: string,
  lang: "ar" | "en",
): Promise<OrderResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "order_permission",
      lang,
    },
    next: { tags: ["ordersId"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch order. Status: ${res.status}`);
  }

  return res.json() as Promise<OrderResponse>;
}
