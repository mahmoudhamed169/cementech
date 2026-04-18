"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function unassignDriverAction(orderId: string, driverId: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${API_URL}/orders/${orderId}/unassign-and-block-driver`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        system_screen: "order_permission",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driver_ids: [driverId] }),
    },
  );

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message ?? "فشل إلغاء التخصيص");
  }

  revalidateTag("ordersId");

  return res.json();
}
