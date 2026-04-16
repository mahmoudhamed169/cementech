"use server";

// src/actions/payments/get-transactions-report-action.ts
// هذا الـ "use server" action هو اللي بيتكالل من الـ Client Component
// ويرجع result object بدل ما يـ throw — أأمن للـ client

import {
  getTransactionsReport,
  Transaction,
  TransactionsReportParams,
} from "@/src/lib/services/payments/get-transactions-report";

// ─── Result Type ──────────────────────────────────────────────────────────────

type ActionResult =
  | { success: true; data: Transaction[] }
  | { success: false; error: string };

// ─── Action ───────────────────────────────────────────────────────────────────

export async function getTransactionsReportAction(
  params: TransactionsReportParams,
): Promise<ActionResult> {
  try {
    const response = await getTransactionsReport(params);

    if (!response.success) {
      return { success: false, error: response.message ?? "فشل جلب البيانات" };
    }

    return { success: true, data: response.data };
  } catch (err) {
    console.error("❌ getTransactionsReportAction error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "حدث خطأ غير متوقع",
    };
  }
}
