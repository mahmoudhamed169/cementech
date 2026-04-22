"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function togglePaymentMethod(id: string, is_active: boolean) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/external-integrations/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
      systemscreen: "settings_permission",
    },
    body: JSON.stringify({ is_active }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle payment method");
  }

  return res.json();
}
