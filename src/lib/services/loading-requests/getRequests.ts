import { RequestsResponse } from "../../types/requests/request";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GetRequestsParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?:
    | "received"
    | "approved"
    | "factory_arrival"
    | "loading"
    | "loaded"
    | "rejected";
  time?: "today" | "this_week" | "this_month" | "all";
}

export async function getRequests(
  params: GetRequestsParams,
  lang: "ar" | "en" ,
): Promise<RequestsResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/requests?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_requests",
      lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }

  return res.json() as Promise<RequestsResponse>;
}
