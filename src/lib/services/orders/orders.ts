import { OrdersResponse } from "../../types/orders/order";

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: "all" | "under_review" | "approved" | "rejected" | "delivery";
  time?: "today" | "this_week" | "this_month" | "all";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrders(
  params: GetOrdersParams,
): Promise<OrdersResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/orders?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_orders",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json() as Promise<OrdersResponse>;
}



