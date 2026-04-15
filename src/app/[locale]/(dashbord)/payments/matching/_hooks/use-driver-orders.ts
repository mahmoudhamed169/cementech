import { useQuery } from "@tanstack/react-query";

export interface DriverOrder {
  id: string;
  orderCode: string;
  total: number;
  delivery_money: number;
  invoice_picture: string | null;
  earning_status: "Paid" | "Not paid";
  updated_at: string;
}

export function useDriverOrders(driverId: string) {
  const query = useQuery({
    queryKey: ["driver-orders", driverId],
    queryFn: async () => {
      const res = await fetch(`/api/driver-orders/${driverId}`);

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      return data.data as DriverOrder[];
    },
    enabled: !!driverId,
  });

  return {
    orders: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error
      ? query.error instanceof Error
        ? query.error.message
        : "Something went wrong"
      : null,
  };
}
