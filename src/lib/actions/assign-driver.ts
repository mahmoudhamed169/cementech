"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function assignDriverAction(
  orderId: string,
  driverIds: string[],
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/orders/${orderId}/assign-driver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "orders_permission",
      lang: "en",
    },
    body: JSON.stringify({ driver_ids: driverIds }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Assign driver error:", {
      status: res.status,
      body: errorBody,
    });
    throw new Error(`Failed to assign driver. Status: ${res.status}`);
  }

  revalidateTag("ordersId");
  revalidateTag("orders");

  return res.json();
}
