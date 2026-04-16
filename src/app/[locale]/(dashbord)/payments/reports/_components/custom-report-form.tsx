"use client";

import { useState, useTransition } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionsReportTable } from "./transactions-report-table";
import { Transaction } from "@/src/lib/services/payments/get-transactions-report";
import { getTransactionsReportAction } from "../get-transactions-report-action";
import { TransactionsReport } from "./transactions-report";

type ReportType = "order" | "request" | "all";

export function CustomReportForm() {
  const [reportType, setReportType] = useState<ReportType>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isValid = startDate && endDate;

  function handleFetch() {
    if (!isValid) return;

    setError(null);

    startTransition(async () => {
      const result = await getTransactionsReportAction({
        from_date: startDate,
        to_date: endDate,
        transaction_type: reportType !== "all" ? reportType : undefined,
      });

      if (!result.success) {
        setError(result.error ?? "حدث خطأ أثناء جلب البيانات");
        setTransactions(null);
        return;
      }

      setTransactions(result.data);
    });
  }

  return (
    <div className="space-y-5" dir="rtl">
      {/* ── Form Card (ستايل قديم) ── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
        <h3 className="text-base font-bold text-gray-800">إنشاء تقرير مخصص</h3>

        <div className="flex flex-wrap items-end gap-4">
          {/* نوع التقرير */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
            <label className="text-sm text-gray-500">نوع التقرير</label>
            <Select
              value={reportType}
              onValueChange={(v) => setReportType(v as ReportType)}
            >
              <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white text-sm">
                <SelectValue placeholder="اختر نوع التقرير" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="all">الكل (طلبات + تحميل)</SelectItem>
                <SelectItem value="order">طلبات فقط</SelectItem>
                <SelectItem value="request">طلبات تحميل فقط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* تاريخ البداية */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
            <label className="text-sm text-gray-500">تاريخ البداية</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* تاريخ النهاية */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
            <label className="text-sm text-gray-500">تاريخ النهاية</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* زرار */}
          <Button
            onClick={handleFetch}
            disabled={!isValid || isPending}
            className="h-12 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2 whitespace-nowrap"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {isPending ? "جاري الجلب…" : "إنشاء و تحميل التقرير"}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      {transactions !== null &&
        (transactions.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-8 text-center text-sm text-gray-500">
            لا توجد معاملات في هذه الفترة
          </div>
        ) : (
          <TransactionsReport transactions={transactions} />
        ))}
    </div>
  );
}
