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

  const requestBody = { driver_ids: driverIds };

  // ✅ Logging the request details for debugging
  console.log("➡️ Assign Driver REQUEST:", {
    url: `${API_URL}/orders/${orderId}/assign-driver`,
    method: "POST",
    body: requestBody,
  });

  const res = await fetch(`${API_URL}/orders/${orderId}/assign-driver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "orders_permission",
      lang: "en",
    },
    body: JSON.stringify(requestBody),
  });

  // ✅ Logging the response details for debugging
  const responseText = await res.text();
  console.log("⬅️ Assign Driver RESPONSE:", {
    status: res.status,
    ok: res.ok,
    body: responseText,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to assign driver. Status: ${res.status} | Body: ${responseText}`,
    );
  }

  revalidateTag("ordersId");
  revalidateTag("orders");

  return JSON.parse(responseText);
}
