import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import {
  GetInvoicesParams,
  InvoicesResponse,
} from "../../types/invoices/invoice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getInvoices({
  page = 1,
  limit = 10,
  search,
  invoiceType,
}: GetInvoicesParams = {}): Promise<InvoicesResponse> {
  const session = await getServerSession(authOptions);

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(invoiceType ? { invoice_type: invoiceType } : {}),
    ...(search ? { search } : {}),
  });

  const res = await fetch(`${API_URL}/invoices?${params}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
         system_screen: "invoices_permission",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Get invoices error:", res.status, text);
    throw new Error(`Failed to fetch invoices: ${res.status}`);
  }

  return res.json();
}
