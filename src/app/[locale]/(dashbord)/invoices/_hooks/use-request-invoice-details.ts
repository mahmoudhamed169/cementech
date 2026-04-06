// @/src/lib/hooks/use-request-invoice-details.ts

import { useQuery } from "@tanstack/react-query";
import { RequestInvoiceDetailsResponse } from "@/src/lib/types/invoices/request-invoice-details";

async function fetchRequestInvoiceDetails(
  id: string,
): Promise<RequestInvoiceDetailsResponse> {
  const res = await fetch(`/api/invoices/${id}?type=requests`);
  if (!res.ok) throw new Error("Failed to fetch request invoice details");
  return res.json();
}

export function useRequestInvoiceDetails(id: string) {
  return useQuery({
    queryKey: ["request-invoice", id],
    queryFn: () => fetchRequestInvoiceDetails(id),
    enabled: !!id,
  });
}
