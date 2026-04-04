"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function deleteDeliveryLocation(id: string): Promise<void> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/delivery-locations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete delivery location");
  }

  revalidateTag("delivery-locations");
}
