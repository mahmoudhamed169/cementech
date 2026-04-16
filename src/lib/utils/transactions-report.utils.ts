// src/lib/transactions-report.utils.ts

import { Transaction } from "../services/payments/get-transactions-report";


// ─── Summary Totals ──────────────────────────────────────────────────────────

export interface ReportSummary {
  totalTransactions: number;
  totalCaptured: number; // مجموع المبالغ المحصلة
  totalCement: number; // مجموع تكلفة الأسمنت (orders فقط)
  totalDelivery: number; // مجموع تكلفة التوصيل (orders فقط)
  totalPlatformFees: number; // مجموع عمولة المنصة (orders فقط)
  totalBankFees: number; // مجموع رسوم البنك (orders فقط)
}

export function calcSummary(transactions: Transaction[]): ReportSummary {
  let totalCaptured = 0;
  let totalCement = 0;
  let totalDelivery = 0;
  let totalPlatformFees = 0;
  let totalBankFees = 0;

  for (const tx of transactions) {
    if (tx.status === "captured") {
      totalCaptured += tx.amount;
    }
    if (tx.transaction_Type === "order" && tx.order) {
      totalCement += tx.order.total_without_fees;
      totalDelivery += tx.order.delivery_fees;
      totalPlatformFees += tx.order.platform_fees;
      totalBankFees += tx.order.bank_fees;
    }
  }

  return {
    totalTransactions: transactions.length,
    totalCaptured,
    totalCement,
    totalDelivery,
    totalPlatformFees,
    totalBankFees,
  };
}

// ─── Label Helpers ───────────────────────────────────────────────────────────

export type TxStatus = Transaction["status"];
export type TxType = Transaction["transaction_Type"];

export const STATUS_LABEL: Record<TxStatus, string> = {
  captured: "مكتمل",
  pending: "معلق",
  refunded: "مسترجع",
};

export const TYPE_LABEL: Record<TxType, string> = {
  order: "طلب",
  request: "طلب تحميل",
};

// ─── Number Formatter ────────────────────────────────────────────────────────

export function formatCurrency(value: number): string {
  // نتجاهل القيم الغريبة (مثلاً 1092187 اللي في الداتا — خطأ في الـ API)
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

// ─── Short Invoice ID ────────────────────────────────────────────────────────

/** يعرض أول 8 حروف من الـ invoice_id علشان الجدول ميتوسعش */
export function shortId(id: string): string {
  return id.slice(0, 8) + "…";
}
