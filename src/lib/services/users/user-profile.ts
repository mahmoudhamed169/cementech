import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CustomerStats {
  totalOrders: number;
  totalPaid: number;
  lastOrderDate: string | null;
}

export interface CustomerProfileData {
  id: string;
  phone: string;
  code: string;
  customer_type: "company" | "individual";
  status: "active" | "inactive" | "blocked";
  order_count: number;
  total_payments: number;
  user_id: string;
  customer_name: string;
  company_name: string | null;
  customer_industry: string;
  tax_number: string;
  created_at: string;
  updated_at: string;
  stats: CustomerStats;
}

export interface CustomerProfileResponse {
  success: boolean;
  message: string;
  data: CustomerProfileData;
}

export async function fetchCustomerProfile(
  id: string,
): Promise<CustomerProfileData> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/${id}/customerProfile`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "user_permission",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => res.text());
    console.error("Customer profile error:", {
      status: res.status,
      body: errorBody,
    });
    throw new Error(`Failed to fetch customer profile: ${res.status}`);
  }

  const result: CustomerProfileResponse = await res.json();
  return result.data;
}
