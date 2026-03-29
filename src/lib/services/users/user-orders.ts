import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserOrder {
  id: string;
  product_name: string;
  factory_name: string;
  code: string;
  created_at: string;
  quantity: number;
  order_status: string;
  total: number;
  invoice_id: string;
}

export interface UserOrdersMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface UserOrdersResponse {
  success: boolean;
  message: string;
  data: UserOrder[];
  meta: UserOrdersMeta;
}

export interface GetUserOrdersParams {
  id: string;
  page?: number;
  limit?: number;
}

export async function fetchUserOrders(
  params: GetUserOrdersParams,
): Promise<UserOrdersResponse> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));

  const url = `${API_URL}/users/${params.id}/orders?${query.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "user_permission",
      lang: "en",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => res.text());
    console.error("User orders error:", {
      status: res.status,
      statusText: res.statusText,
      body: JSON.stringify(errorBody),
      url,
    });
    throw new Error(`Failed to fetch user orders: ${res.status}`);
  }

  return res.json() as Promise<UserOrdersResponse>;
}
