import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface Permission {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  is_admin: boolean;
  home_permission: HttpMethod[];
  order_permission: HttpMethod[];
  driver_permission: HttpMethod[];
  loading_request_permission: HttpMethod[];
  user_permission: HttpMethod[];
  payment_permission: HttpMethod[];
  invoice_permission: HttpMethod[];
  notification_permission: HttpMethod[];
  management_permission: HttpMethod[];
  supervisor_permission: HttpMethod[];
  supplier_permission: HttpMethod[];
  terms_permission: HttpMethod[];
  setting_permission: HttpMethod[];
  user_count: number;
  created_at: string;
  updated_at: string;
}

export interface PermissionsResponse {
  success: boolean;
  message: string;
  data: Permission[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export async function getPermissions(): Promise<PermissionsResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/permissions`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "management_permission",
      lang: "all",
    },
    next: { tags: ["permissions"] },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch permissions");
  }

  return res.json() as Promise<PermissionsResponse>;
}
