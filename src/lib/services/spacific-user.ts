import {
  CustomerApiResponse,
  CustomerUser,
  DriverApiResponse,
  DriverUser,
} from "../types/spacific-user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// -------------------------
// Fetch Driver
// -------------------------
export async function fetchDriver(id: string): Promise<DriverUser> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_users",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch driver");

  const result: DriverApiResponse = await res.json();
  return result.data;
}

// -------------------------
// Fetch Customer
// -------------------------
async function fetchCustomer(id: string): Promise<CustomerUser> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_users",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch customer");

  const result: CustomerApiResponse = await res.json();
  return result.data;
}
