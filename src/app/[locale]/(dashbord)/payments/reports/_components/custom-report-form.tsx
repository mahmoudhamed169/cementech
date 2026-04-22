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
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">
          إنشاء تقرير مخصص
        </h3>

        {/* ✅ grid بـ 4 أعمدة متساوية */}
        <div className="grid grid-cols-4 items-end gap-4">
          {/* نوع التقرير */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">نوع التقرير</label>
            <Select
              value={reportType}
              onValueChange={(v) => setReportType(v as ReportType)}
            
            >
              <SelectTrigger className="min-h-12 rounded-xl border-gray-200 bg-white text-sm w-full">
            
                <SelectValue placeholder="اختر نوع التقرير" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="order">طلبات فقط</SelectItem>
                <SelectItem value="request">طلبات تحميل فقط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* تاريخ البداية */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">تاريخ البداية</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-12 rounded-xl border border-gray-200 px-4 text-sm w-full"
            />
          </div>

          {/* تاريخ النهاية */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">تاريخ النهاية</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-12 rounded-xl border border-gray-200 px-4 text-sm w-full"
            />
          </div>

          {/* الزر */}
          <Button
            onClick={handleFetch}
            disabled={!isValid || isPending}
            className="h-12 w-full rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {isPending ? "جاري الجلب…" : "إنشاء التقرير"}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Results */}
      {transactions !== null &&
        (transactions.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-gray-400 text-sm">
            لا توجد معاملات في هذه الفترة
          </div>
        ) : (
          <TransactionsReport
            transactions={transactions}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
    </div>
  );
}
