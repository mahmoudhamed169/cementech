"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";
import { DeleteAdResponse } from "@/src/lib/types/settings/ads/ads";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function deleteAd(id: string): Promise<DeleteAdResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/ads/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
      systemscreen: "settings_permission",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Delete ad error:", error);
    throw new Error("Failed to delete ad");
  }

  revalidateTag("ads");

  return res.json() as Promise<DeleteAdResponse>;
}