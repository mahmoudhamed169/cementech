"use client";

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
  const summary = calcSummary(transactions);

  const thClass =
    "text-center text-[#364153] font-bold whitespace-nowrap h-[50px] border border-gray-200 bg-gray-50 px-3";

  const tdClass =
    "text-center border border-gray-200 px-3 h-[50px] align-middle";

  const formatDate = (date: string) => {
    const d = new Date(date);

    return {
      day: d.toLocaleDateString("en-GB"),
      time: d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div dir="rtl">
      {/* count */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2 print:hidden">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          {transactions.length} معاملة
        </p>
      </div>

      {/* table */}
      <div className="rounded-xl border border-gray-200 overflow-x-auto">
        <Table className="border-collapse w-full print:text-[10px]">
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
            {transactions.map((tx, index) => {
              const isOrder = tx.transaction_Type === "order";
              const ord = tx.order;
              const req = tx.request;
              const code = isOrder ? ord?.code : req?.code;

              const date = formatDate(tx.created_at);

              return (
                <TableRow
                  key={tx.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  {/* ✅ SERIAL NUMBER */}
                  <TableCell className={tdClass}>
                    <span className="text-[11px] text-gray-500">
                      {index + 1}
                    </span>
                  </TableCell>

                  <TableCell className={`${tdClass} font-medium `}>
                    {shortId(tx.order?.code || tx.request?.code || "")}
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
                    {isOrder && ord ? ord.total_without_fees : "—"}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? ord.delivery_fees : "—"}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? ord.platform_fees : "—"}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {isOrder && ord ? ord.bank_fees : "—"}
                  </TableCell>

                  <TableCell className={`${tdClass} tabular-nums`}>
                    {tx.amount.toFixed(2)}
                  </TableCell>

                  {/* DATE */}
                  <TableCell className={`${tdClass} print:w-[120px]`}>
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-[11px] print:text-[9px]">
                        {date.day}
                      </span>
                      <span className="text-[10px] text-gray-500 print:text-[8px]">
                        {date.time}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {/* ✅ UI FOOTER (NORMAL) */}
          <TableFooter className="print:hidden">
            <TableRow>
              <TableCell
                colSpan={4}
                className={`${tdClass} text-muted-foreground font-semibold`}
              >
                الإجمالي ({transactions.length} معاملة)
              </TableCell>

              <TableCell className={`${tdClass} font-semibold`}>
                {summary.totalCement}
              </TableCell>

              <TableCell className={`${tdClass} font-semibold`}>
                {summary.totalDelivery}
              </TableCell>

              <TableCell className={`${tdClass} font-semibold`}>
                {summary.totalPlatformFees}
              </TableCell>

              <TableCell className={`${tdClass} font-semibold`}>
                {summary.totalBankFees}
              </TableCell>

              <TableCell className={`${tdClass} font-bold flex items-center justify-center`}>
                {summary.totalCaptured.toFixed(2)} <CurrencyIcon />
              </TableCell>

             
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
