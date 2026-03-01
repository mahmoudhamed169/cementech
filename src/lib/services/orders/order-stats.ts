export interface OrderStatusStat {
  status:
    | "delivered"
    | "canceled"
    | "in_preparation"
    | "under_review"
    | "delivery";
  totalOrders: number;
}

export interface OrdersStatsData {
  statuses: OrderStatusStat[];
  total: number;
}

export interface OrdersStatsResponse {
  success: boolean;
  message: string;
  data: OrdersStatsData;
}

export interface GetOrderStatsParams {
  lang: "ar" | "en";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrderStats(
  params: GetOrderStatsParams,
): Promise<OrdersStatsResponse> {
  const query = new URLSearchParams();

  if (params.lang) {
    query.append("lang", params.lang);
  }

  const res = await fetch(`${API_URL}/orders/stats?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_orders_stats",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order stats");
  }

  return res.json() as Promise<OrdersStatsResponse>;
}
