import { useQuery } from "@tanstack/react-query";
import { InvoiceDetailsResponse } from "@/src/lib/types/invoices/invoice-details";

async function fetchInvoiceDetails(
  id: string,
): Promise<InvoiceDetailsResponse> {
  const res = await fetch(`/api/invoices/${id}?type=orders`);
  if (!res.ok) throw new Error("Failed to fetch invoice details");
  return res.json();
}

export function useInvoiceDetails(id: string) {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => fetchInvoiceDetails(id),
    enabled: !!id,
  });
}
