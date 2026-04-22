import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { RequestsResponse } from "../../types/requests/request";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GetRequestsParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?:
    | "all"
    | "received"
    | "approved"
    | "factory_arrival"
    | "loading"
    | "loaded"
    | "rejected"
    | "pending_payment";

  time?: "today" | "this_week" | "this_month" | "all";
  request_type?: string;
}

export async function getRequests(
  params: GetRequestsParams,
  lang: "ar" | "en",
): Promise<RequestsResponse> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/requests?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "loading_request_permission",
      lang,
    },
    next: { tags: ["requests"] },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.log("Status:", res.status);
    console.log("Body:", errorBody);
    throw new Error("Failed to fetch requests stats");
  }

  return res.json() as Promise<RequestsResponse>;
}
