"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function cancelOrderAction(id: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "order_permission",
    },
    body: JSON.stringify({ status: "canceled" }),
  });

  if (!res.ok) {
    throw new Error("Failed to cancel order");
  }

  revalidateTag("orders");
  revalidateTag("orders/orderstatus");
  return res.json();
}
