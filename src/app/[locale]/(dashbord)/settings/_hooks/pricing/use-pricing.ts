import { useQuery } from "@tanstack/react-query";
import { PricingResponse } from "@/src/lib/types/settings/pricing/pricing";

async function fetchPricing(): Promise<PricingResponse> {
  const res = await fetch("/api/pricing");
  if (!res.ok) throw new Error("Failed to fetch pricing");
  return res.json();
}

export function usePricing() {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: fetchPricing,
  });
}
