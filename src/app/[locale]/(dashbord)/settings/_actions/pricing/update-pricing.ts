"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";
import {
  UpdatePricingInput,
  PricingResponse,
} from "@/src/lib/types/settings/pricing/pricing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updatePricing(
  input: UpdatePricingInput,
): Promise<PricingResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/pricing`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "settings_permission",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Pricing update error:", error);
    throw new Error("Failed to update pricing");
  }

  revalidateTag("pricing");

  return res.json() as Promise<PricingResponse>;
}
