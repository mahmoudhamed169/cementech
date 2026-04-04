import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { DeliveryLocationsResponse } from "@/src/lib/types/settings/delivery/delivery-location";

async function fetchDeliveryLocations(
  lang: string,
): Promise<DeliveryLocationsResponse> {
  const res = await fetch("/api/delivery-locations", {
    headers: { lang },
  });

  if (!res.ok) throw new Error("Failed to fetch delivery locations");

  return res.json();
}

export function useDeliveryLocations() {
  const locale = useLocale();

  return useQuery({
    queryKey: ["delivery-locations", locale],
    queryFn: () => fetchDeliveryLocations(locale),
  });
}
