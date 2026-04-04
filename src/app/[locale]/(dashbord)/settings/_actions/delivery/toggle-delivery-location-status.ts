"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function toggleDeliveryLocationStatus(
  id: string,
  is_active: boolean,
): Promise<void> {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${API_URL}/settings/delivery-locations/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
        System_Screen: "settings_permissions",
      },
      body: JSON.stringify({ is_active }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to toggle delivery location status");
  }

  revalidateTag("delivery-locations");
}
