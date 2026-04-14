// src/lib/services/matching-stats.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface DriverFinancialStat {
  driverId: string;
  driverCode: string;
  driverName: string;
  phoneNumber: string;
  ordersCompleted: number;
  totalEarning: number;
  pendingEarning: number;
  earningStatus: string;
  lastPayment: string | null;
}

export interface DriverFinancialStatsMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface DriverFinancialStatsResponse {
  data: DriverFinancialStat[];
  meta: DriverFinancialStatsMeta;
}

export async function getDriverFinancialStats(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<DriverFinancialStatsResponse> {
  const session = await getServerSession(authOptions);

  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.status) searchParams.set("status", params.status);

  const res = await fetch(
    `${API_URL}/users/driverProfile/financialStats?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      next: { tags: ["driver-financial-stats"] },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch driver financial stats: ${res.status}`);
  }

  const json = await res.json();
  return { data: json.data, meta: json.meta };
}
