import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PlatformFeeMetrics {
  totalPlatformFee: number;
  totalBankFee: number;
  totalCommission: number;
}

export interface RevenueMetrics {
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  date: string;
}

export interface OrdersReportData {
  platform_fee_metrics: PlatformFeeMetrics;
  revenue_metrics: RevenueMetrics;
}

export interface OrdersReportResponse {
  success: boolean;
  message: string;
  data: OrdersReportData;
}

export async function getOrdersReport(): Promise<OrdersReportResponse> {
  const session = await getServerSession(authOptions);

  const url = `${API_URL}/orders/orders-report`;

  console.log("🔍 Fetching:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "payment_permission",
      lang: "en",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("❌ API Error:", res.status, res.statusText, errorBody);
    throw new Error(
      `Failed to fetch orders report: ${res.status} - ${errorBody}`,
    );
  }

  return res.json() as Promise<OrdersReportResponse>;
}
