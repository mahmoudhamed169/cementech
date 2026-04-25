"use client";

import { useTransition } from "react";
import { Printer, Loader2 } from "lucide-react";
import { Transaction } from "@/src/lib/services/payments/get-transactions-report";
import { TransactionsSummaryCards } from "./transactions-summary-cards";
import { TransactionsReportTable } from "./transactions-report-table";
import { useTranslations } from "next-intl";

interface Props {
  transactions: Transaction[];
  startDate?: string;
  endDate?: string;
}

export function TransactionsReport({
  transactions,
  startDate,
  endDate,
}: Props) {
  const t = useTranslations("PaymentsPage.reports.transactionsReport");
  const [isPrinting, startPrint] = useTransition();

  function handleExportPDF() {
    startPrint(async () => {
      const printDate = new Date().toLocaleString("ar-SA");

      const formatDate = (date?: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      const rangeText =
        startDate && endDate
          ? `${t("dateRange", { from: formatDate(startDate), to: formatDate(endDate) })}`
          : "";

      const printArea = document.getElementById("reportprintarea");
      if (!printArea) return;

      const header = document.createElement("div");
      header.innerHTML = `
<div style="
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-bottom:2px solid #ea580c;
  padding-bottom:16px;
  margin-bottom:22px;
  font-family: Arial, sans-serif;
">
  <div style="text-align:right; display:flex; flex-direction:column; gap:4px;">
    <p style="margin:0; font-size:20px; font-weight:800; color:#1f2937;">
      ${t("printTitle")}
    </p>
    ${rangeText ? `<p style="margin:0; font-size:12px; color:#374151;">${rangeText}</p>` : ""}
    <p style="margin:0; font-size:11px; color:#6b7280;">
      ${t("printDate")}: ${printDate}
    </p>
  </div>
  <div style="display:flex; align-items:center; justify-content:center; min-width:110px;">
    <img src="/images/logo2.webp" style="width:150px; height:150px; object-fit:contain; display:block;" />
  </div>
</div>
      `;

      printArea.prepend(header);

      const style = document.createElement("style");
      style.textContent = `
        @media print {
          body * { visibility: hidden; }
          #printwrapper, #printwrapper * { visibility: visible; }
          #printwrapper { position: absolute; inset: 0; padding: 24px; background: white; }
          .print\\:hidden { display: none !important; }
          @page { size: A4 landscape; margin: 12mm; }
        }
      `;

      document.head.appendChild(style);
      await new Promise((res) => setTimeout(res, 300));
      window.print();

      style.remove();
      header.remove();
    });
  }

  return (
    <div id="printwrapper">
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={handleExportPDF}
          disabled={isPrinting}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2
                     text-sm font-medium text-white hover:bg-orange-700
                     disabled:opacity-60 transition-colors"
        >
          {isPrinting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Printer size={14} />
          )}
          {t("print")}
        </button>
      </div>

      <div id="reportprintarea" dir="rtl">
        <TransactionsSummaryCards transactions={transactions} />
        <TransactionsReportTable transactions={transactions} />
      </div>
    </div>
  );
}
