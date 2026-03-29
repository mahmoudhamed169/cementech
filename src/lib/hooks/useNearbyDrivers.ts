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
  quantity: number,
  order_id: string,
): Promise<NearbyDriver[]> => {
  const query = new URLSearchParams({
    product_id: productId,
    quantity: String(quantity),
    order_id,
  });

  const res = await fetch(`/api/near-drivers?${query.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch near drivers");

  const json = await res.json();
  return json.data;
};

export const useNearbyDrivers = (
  productId: string,
  quantity: number,
  order_id: string,
) => {
  return useQuery({
    queryKey: ["nearby-drivers", productId, quantity, order_id],
    queryFn: () => fetchNearbyDrivers(productId, quantity, order_id),
    enabled: !!productId,
    staleTime: 1000 * 60 * 2,
  });
};
