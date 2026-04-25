import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import {
  GetInvoicesParams,
  InvoicesResponse,
} from "../../types/invoices/invoice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getInvoices(params: GetInvoicesParams = {}) {
  const session = await getServerSession(authOptions);

  const token = session?.user?.accessToken; // أو حسب شكل السيشن عندك

  if (!token) {
    throw new Error("No auth token found");
  }

  const query = new URLSearchParams({
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
    ...(params.invoiceType ? { invoice_type: params.invoiceType } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  const res = await fetch(`${API_URL}/invoices?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      systemscreen: "invoice_permission",
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
