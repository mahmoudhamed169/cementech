import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
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
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/orders?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "order_permission",
    },
    next: { tags: ["orders"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json() as Promise<OrdersResponse>;
}
