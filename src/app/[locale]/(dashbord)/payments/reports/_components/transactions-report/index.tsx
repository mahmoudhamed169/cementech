"use client";

import { Transaction } from "@/src/lib/services/payments/get-transactions-report";
import { TransactionsSummaryCards } from "./transactions-summary-cards";
import { TransactionsReportTable } from "./transactions-report-table";

export { TransactionsSummaryCards } from "./transactions-summary-cards";
export { TransactionsReportTable } from "./transactions-report-table";
export { Badge } from "./badge";

interface Props {
  transactions: Transaction[];
}

export function TransactionsReport({ transactions }: Props) {
  return (
    <div >
      <TransactionsSummaryCards transactions={transactions} />
      <TransactionsReportTable transactions={transactions} />
    </div>
  );
}
