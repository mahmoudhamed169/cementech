import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { ApiUserResponse, Customer, Driver } from "../types/users";
import { getLocale } from "next-intl/server"; // ✅

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
  lang?: string; // ✅
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers<T extends Driver | Customer>(
  params: GetUsersParams,
): Promise<ApiUserResponse<T>> {
  const session = await getServerSession(authOptions);

  const { screen, lang, ...queryParams } = params;

  const query = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/users?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: screen ?? params.type ?? "user_permission",
      ...(lang && { lang }), // ✅
    },
    next: { tags: ["supervisors"] },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => res.text());
    console.error("Users error:", {
      status: res.status,
      body: errorBody,
      url: `${API_URL}/users?${query.toString()}`,
    });
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json() as Promise<ApiUserResponse<T>>;
}
