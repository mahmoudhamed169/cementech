import { useEffect, useState } from "react";

export interface DriverOrder {
  id: string;
  orderCode: string;
  total: number;
  delivery_money: number;
  invoice_picture: string | null;
  earning_status: "Paid" | "Not paid";
  updated_at: string;
}

interface UseDriverOrdersReturn {
  orders: DriverOrder[];
  isLoading: boolean;
  error: string | null;
}

export function useDriverOrders(driverId: string): UseDriverOrdersReturn {
  const [orders, setOrders] = useState<DriverOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!driverId) return;

    async function fetchOrders() {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/driver-orders/${driverId}`);

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();

        setOrders(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [driverId]);

  return { orders, isLoading, error };
}
