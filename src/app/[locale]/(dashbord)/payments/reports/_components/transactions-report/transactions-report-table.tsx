"use client";

import { useTransition } from "react";
import { Printer, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  calcSummary,
  shortId,
  STATUS_LABEL,
  TYPE_LABEL,
} from "@/src/lib/utils/transactions-report.utils";
import { Transaction } from "@/src/lib/services/payments/get-transactions-report";
import { Badge } from "./badge";
import {
  TABLE_HEADERS,
  STATUS_CLASS,
  TYPE_CLASS,
} from "./transactions-report.constants";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";

interface Props {
  transactions: Transaction[];
}

export function TransactionsReportTable({ transactions }: Props) {
  const [isPrinting, startPrint] = useTransition();
  const summary = calcSummary(transactions);

  function handleExportPDF() {
    startPrint(async () => {
      const style = document.createElement("style");
      style.id = "__print_override__";
      style.textContent = `
        @media print {
          body * { visibility: hidden !important; }
          #print-area,
          #print-area * { visibility: visible !important; }
          #print-area {
            position: absolute;
            inset: 0;
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
      await new Promise<void>((res) => setTimeout(res, 100));
      window.print();
      document.getElementById("__print_override__")?.remove();
    });
  }

  const thClass =
    "text-center text-[#364153] font-bold whitespace-nowrap h-[50px] " +
    "border border-gray-200 bg-gray-50 px-3";

  const tdClass =
    "text-center border border-gray-200 px-3 h-[50px] align-middle";

  return (
    <div dir="rtl">
      {/* toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2 print:hidden">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          {transactions.length} معاملة
        </p>

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
          طباعة / PDF
        </button>
      </div>

      {/* table */}
      <div
        id="print-area"
        className="rounded-xl border border-gray-200 overflow-x-auto"
      >
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="hover:bg-gray-50">
              {TABLE_HEADERS.map((header) => (
                <TableHead key={header} className={thClass}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((tx) => {
              const isOrder = tx.transaction_Type === "order";
              const ord = tx.order;
              const req = tx.request;
              const code = isOrder ? ord?.code : req?.code;

              return (
                <TableRow
                  key={tx.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <TableCell className={tdClass}>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {shortId(tx.invoice_id)}
                    </span>
                  </TableCell>

                  <TableCell className={`${tdClass} font-medium`}>
                    {code ?? "—"}
                  </TableCell>

                  <TableCell className={tdClass}>
                    <div className="flex justify-center">
                      <Badge
                        label={TYPE_LABEL[tx.transaction_Type]}
                        cls={TYPE_CLASS[tx.transaction_Type]}
                      />
                    </div>
                  </TableCell>

                  <TableCell className={tdClass}>
                    <div className="flex justify-center">
                      <Badge
                        label={STATUS_LABEL[tx.status]}
                        cls={STATUS_CLASS[tx.status]}
                      />
                    </div>
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? (
                      ord.total_without_fees
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? (
                      ord.delivery_fees
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? (
                      ord.platform_fees
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? (
                      ord.bank_fees
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className={tdClass}>
                    <span className="font-semibold tabular-nums flex items-center justify-center gap-1">
                      {tx.amount.toFixed(2)} 
                    </span>
                  </TableCell>

                  <TableCell className={tdClass}>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {new Date(tx.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter >
            <TableRow>
              <TableCell
                colSpan={4}
                className={`${tdClass} text-muted-foreground font-semibold`}
              >
                الإجمالي ({transactions.length} معاملة)
              </TableCell>
              <TableCell className={`${tdClass} tabular-nums font-semibold`}>
                {summary.totalCement}
              </TableCell>
              <TableCell className={`${tdClass} tabular-nums font-semibold`}>
                {summary.totalDelivery}
              </TableCell>
              <TableCell className={`${tdClass} tabular-nums font-semibold`}>
                {summary.totalPlatformFees}
              </TableCell>
              <TableCell className={`${tdClass} tabular-nums font-semibold`}>
                {summary.totalBankFees}
              </TableCell>
              <TableCell className={`${tdClass} tabular-nums font-bold flex items-center justify-center gap-1`}>
                {summary.totalCaptured.toFixed(2)} <CurrencyIcon />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
