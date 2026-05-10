import { AdsResponse } from "@/src/lib/types/ads";
import { useQuery } from "@tanstack/react-query";


async function fetchAds(): Promise<AdsResponse> {
  const res = await fetch("/api/ads");
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json();
}

export function useAds() {
  return useQuery({
    queryKey: ["ads"],
    queryFn: fetchAds,
  });
}