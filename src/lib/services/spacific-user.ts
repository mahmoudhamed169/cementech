import {
  CustomerApiResponse,
  CustomerUser,
  DriverApiResponse,
  DriverUser,
} from "../types/spacific-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// -------------------------
// Fetch Driver
// -------------------------
export async function fetchDriver(id: string): Promise<DriverUser> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "driver",
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
export async function fetchCustomer(id: string): Promise<CustomerUser> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "customer",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch customer");

  const result: CustomerApiResponse = await res.json();
  return result.data;
}
