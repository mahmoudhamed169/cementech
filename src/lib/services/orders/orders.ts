import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { OrdersResponse } from "../../types/orders/order";

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: string;
  time?: "today" | "this_week" | "this_month" | "all";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrders(
  params: GetOrdersParams,
  lang: "ar" | "en",
): Promise<OrdersResponse> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/orders?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "order_permission",
      lang,
    },
    next: { tags: ["orders"] },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Orders error status:", res.status);
    console.error("Orders error body:", errorBody);
    console.error("Orders token:", session?.user.accessToken);
    throw new Error(`Failed to fetch orders: ${res.status}`);
  }

  return res.json() as Promise<OrdersResponse>;
}
