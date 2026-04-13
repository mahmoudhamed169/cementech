import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalDrivers: number;
}

export async function getStats(): Promise<ApiStats> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    next: { tags: ["stats"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
