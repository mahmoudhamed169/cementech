// src/actions/payments/get-transactions-report.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Types ──────────────────────────────────────────────────────────────────

export interface OrderDetails {
  id: string;
  code: string;
  total: number;
  status: string;
  quantity: number;
  payment_type: "10%" | "100%";
  customer_name: string;
  customer_phone: string;
  platform_fees: number;
  delivery_fees: number;
  bank_fees: number;
  total_without_fees: number;
}

export interface RequestDetails {
  id: string;
  code: string;
  status: string;
  quantity: number;
  driver_name: string;
  driver_phone: string;
}

export interface Transaction {
  id: string;
  invoice_id: string;
  provider: "paymob" | "cancellation_fee";
  amount: number;
  status: "captured" | "pending" | "refunded";
  paymob_transaction_id: string | null;
  created_at: string;
  transaction_Type: "order" | "request";
  order: OrderDetails | null;
  request: RequestDetails | null;
}

export interface TransactionsReportResponse {
  success: boolean;
  message: string;
  data: Transaction[];
}

export interface TransactionsReportParams {
  from_date?: string; // "2026-01-01"
  to_date?: string; // "2026-12-31"
  status?: "captured" | "pending" | "refunded";
  transaction_type?: "order" | "request";
}

// ─── Action ─────────────────────────────────────────────────────────────────

export async function getTransactionsReport(
  params: TransactionsReportParams = {},
): Promise<TransactionsReportResponse> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  if (params.from_date) query.set("from_date", params.from_date);
  if (params.to_date) query.set("to_date", params.to_date);
  if (params.status) query.set("status", params.status);
  if (params.transaction_type)
    query.set("transaction_type", params.transaction_type);

  const url = `${API_URL}/invoices/transactions?${query.toString()}`;

  console.log("🔍 Fetching transactions:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "payments_permissions",
      lang: "ar",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("❌ API Error:", res.status, res.statusText, errorBody);
    throw new Error(
      `Failed to fetch transactions report: ${res.status} - ${errorBody}`,
    );
  }

  return res.json() as Promise<TransactionsReportResponse>;
}
