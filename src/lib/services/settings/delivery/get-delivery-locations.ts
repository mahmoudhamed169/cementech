import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { DeliveryLocationsResponse } from "@/src/lib/types/settings/delivery/delivery-location";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDeliveryLocations(
  lang: "ar" | "en",
): Promise<DeliveryLocationsResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/delivery-locations`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch delivery locations");
  }

  return res.json() as Promise<DeliveryLocationsResponse>;
}
