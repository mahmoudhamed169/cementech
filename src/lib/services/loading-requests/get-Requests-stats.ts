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
  const res = await fetch(`${API_URL}/requests/stats`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_requests",
      lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res)
    throw new Error("Failed to fetch requests stats");
  }

  return res.json() as Promise<RequestStatsResponse>;
}
