// src/actions/payments/get-invoice-report.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface InvoiceReportItem {
  id: string;
  code: string;
  customer_name: string;
  total: number;
  bank_fee: number;
  platform_fee: number;
  invoice_id: string;
  invoice_status: "fully paid" | "partially paid" | "unpaid";
  last_transaction_at: string;
  created_at: string;
}

export interface InvoiceReportResponse {
  success: boolean;
  message: string;
  data: InvoiceReportItem[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface InvoiceReportParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  timeRange?: string;
  date?: string;
}

export async function getInvoiceReport({
  page = 1,
  limit = 10,
  search,
  status,
  timeRange,
  date,
}: InvoiceReportParams = {}): Promise<InvoiceReportResponse> {
  const session = await getServerSession(authOptions);

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search) params.set("search", search);

  // decode الـ status لو فيه encoding من الـ URL
  if (status) params.set("status", status);

  if (date) {
    const d = new Date(date);
    params.set("year", String(d.getFullYear()));
    params.set("month", String(d.getMonth() + 1));
    params.set("day", String(d.getDate()));
  } else if (timeRange) {
    params.set("time", timeRange);
  }

  const url = `${API_URL}/orders/invoice-report?${params.toString()}`;

  console.log("🔍 Fetching:", url); // ← نشوف الـ URL كامل في الـ terminal

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "payments_permissions",
      lang: "en",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("❌ API Error:", res.status, res.statusText, errorBody); // ← نشوف الـ error
    throw new Error(
      `Failed to fetch invoice report: ${res.status} - ${errorBody}`,
    );
  }

  return res.json() as Promise<InvoiceReportResponse>;
}
