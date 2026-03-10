import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { ApiUserResponse, Customer, Driver } from "../types/users";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: "all" | "active" | "inactive" | "blocked";
  type?: "customer" | "driver" | "admin";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers<T extends Driver | Customer>(
  params: GetUsersParams,
): Promise<ApiUserResponse<T>> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/users?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: params.type ?? "dashboard_users",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json() as Promise<ApiUserResponse<T>>;
}
