"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";
import { AddAdResponse } from "@/src/lib/types/settings/ads/ads";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addAd(formData: FormData): Promise<AddAdResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/ads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "settings_permission",
      // No Content-Type — browser sets multipart/form-data with boundary automatically
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Add ad error:", error);
    throw new Error("Failed to add ad");
  }

  revalidateTag("ads");

  return res.json() as Promise<AddAdResponse>;
}