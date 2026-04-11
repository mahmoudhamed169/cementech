import { useQuery } from "@tanstack/react-query";

type PaymentMethodAPI = {
  id: string;
  name: string;
  integration_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type PaymentMethodsResponse = {
  data: PaymentMethodAPI[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export function usePaymentMethods() {
  return useQuery<PaymentMethodsResponse>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const res = await fetch("/api/payment-methods");
      if (!res.ok) throw new Error("Failed to fetch payment methods");
      return res.json();
    },
  });
}
