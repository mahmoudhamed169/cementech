import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

export interface UsersStat {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
}

export interface UsersStatsResponse {
  success: boolean;
  message: string;
  data: UsersStat;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GetUsersStatsParams {
  type: "customer" | "driver" | "admin";
  screen?: string;
}

export async function getUsersStats(
  params: GetUsersStatsParams,
): Promise<UsersStatsResponse> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  query.append("type", params.type);

  const res = await fetch(`${API_URL}/users/stats?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: params.screen ?? params.type, // ✅ fallback على type لو screen مش موجود
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => res.text());
    console.error("Users stats error:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch users stats: ${res.status}`);
  }

  return res.json() as Promise<UsersStatsResponse>;
}
