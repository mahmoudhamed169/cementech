import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RequestStat {
  status: string;
  totalRequests: number;
}

export interface RequestStatsResponse {
  success: boolean;
  message: string;
  data: {
    statuses: RequestStat[];
    total: number;
  };
}

export async function getRequestsStats(
  lang: "ar" | "en",
): Promise<RequestStatsResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/requests/stats`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "request",
      lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch requests stats");
  }

  return res.json() as Promise<RequestStatsResponse>;
}
