import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { ApiUserResponse, Customer, Driver } from "../types/users";

type DriverStatus = "free" | "offline" | "pending" | "blocked";
type LoadingStatus = "loaded" | "not loaded" | "pending";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: "all" | "active" | "inactive" | "blocked";
  type?: "customer" | "driver" | "admin";
  screen?: string;
  driverStatus?: DriverStatus;
  requestStatus?: LoadingStatus;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers<T extends Driver | Customer>(
  params: GetUsersParams,
): Promise<ApiUserResponse<T>> {
  const session = await getServerSession(authOptions);

  const { screen, ...queryParams } = params;

  const query = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // ✅ ضيف value !== ""
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/users?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: screen ?? params.type ?? "user_permission",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => res.text());
    console.error("Users error:", {
      status: res.status, // ← إيه الرقم ده؟ 401؟ 403؟ 500؟
      body: errorBody, // ← إيه الرسالة؟
      url: `${API_URL}/users?${query.toString()}`,
    });
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json() as Promise<ApiUserResponse<T>>;
}
