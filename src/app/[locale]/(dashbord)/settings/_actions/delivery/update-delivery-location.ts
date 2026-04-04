"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type UpdateDeliveryLocationInput = {
  name_ar: string;
  name_en: string;
  lat: number;
  lng: number;
  radius: number;
  is_active: boolean;
};

export type UpdateDeliveryLocationResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name_ar: string;
    name_en: string;
    lat: number;
    lng: number;
    radius: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};

export async function updateDeliveryLocation(
  id: string,
  input: UpdateDeliveryLocationInput,
): Promise<UpdateDeliveryLocationResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/delivery-locations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      System_Screen: "settings_permissions",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to update delivery location");
  }

  revalidateTag("delivery-locations");

  return res.json() as Promise<UpdateDeliveryLocationResponse>;
}
