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
      systemscreen: "home_permission",
    },
    next: { tags: ["stats"] },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("stats error:", res.status, body);
    throw new Error("Failed to fetch order stats");
  }

  const json = await res.json();
  return json.data;
}
