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

export async function getInvoiceReport(
  page = 1,
  limit = 10,
): Promise<InvoiceReportResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${API_URL}/orders/invoice-report?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        system_screen: "payments_permissions",
        lang: "en",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch invoice report");

  return res.json() as Promise<InvoiceReportResponse>;
}
