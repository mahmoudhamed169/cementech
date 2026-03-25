import { useQuery } from "@tanstack/react-query";

export interface NearbyDriver {
  id: string;
  driver_name: string;
  code: string;
  distance?: number;
  quantity: string;
}

const fetchNearbyDrivers = async (
  productId: string,
  quantity: number
): Promise<NearbyDriver[]> => {
  const query = new URLSearchParams({
    product_id: productId,
    quantity: String(quantity),
  });

  
  const res = await fetch(`/api/near-drivers?${query.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch near drivers");

  const json = await res.json();
  return json.data;
};

export const useNearbyDrivers = (productId: string, quantity: number) => {
  return useQuery({
    queryKey: ["nearby-drivers", productId, quantity],
    queryFn: () => fetchNearbyDrivers(productId, quantity),
    enabled: !!productId,
    staleTime: 1000 * 60 * 2,
  });
};
