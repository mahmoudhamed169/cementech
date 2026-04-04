"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type AddDeliveryLocationInput = {
  name_ar: string;
  name_en: string;
  lat: number;
  lng: number;
  radius: number;
};

export type AddDeliveryLocationResponse = {
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

export async function addDeliveryLocation(
  input: AddDeliveryLocationInput,
): Promise<AddDeliveryLocationResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/delivery-locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to add delivery location");
  }

  revalidateTag("delivery-locations");

  return res.json() as Promise<AddDeliveryLocationResponse>;
}
