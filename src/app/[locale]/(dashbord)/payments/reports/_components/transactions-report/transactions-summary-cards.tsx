"use client";

import { useTranslations } from "next-intl";
import { calcSummary } from "@/src/lib/utils/transactions-report.utils";
import { Transaction } from "@/src/lib/services/payments/get-transactions-report";

interface Props {
  transactions: Transaction[];
}

export function TransactionsSummaryCards({ transactions }: Props) {
  const t = useTranslations(
    "PaymentsPage.reports.transactionsReport.summaryCards",
  );
  const summary = calcSummary(transactions);

  const cards = [
    {
      label: t("totalTransactions"),
      value: summary.totalTransactions.toFixed(2),
      sub: t("allTypes"),
      bg: "from-blue-400/30 to-blue-200/20",
      text: "text-blue-700",
      dot: "bg-blue-400",
    },
    {
      label: t("totalCaptured"),
      value: summary.totalCaptured.toFixed(2),
      sub: t("capturedOnly"),
      bg: "from-green-400/30 to-green-200/20",
      text: "text-green-700",
      dot: "bg-green-400",
    },
    {
      label: t("cementCost"),
      value: summary.totalCement.toFixed(2),
      sub: t("ordersOnly"),
      bg: "from-orange-400/30 to-orange-200/20",
      text: "text-orange-700",
      dot: "bg-orange-400",
    },
    {
      label: t("deliveryCost"),
      value: summary.totalDelivery.toFixed(2),
      sub: t("ordersOnly"),
      bg: "from-purple-400/30 to-purple-200/20",
      text: "text-purple-700",
      dot: "bg-purple-400",
    },
    {
      label: t("bankFees"),
      value: summary.totalBankFees.toFixed(2),
      sub: t("ordersOnly"),
      bg: "from-red-400/30 to-red-200/20",
      text: "text-red-700",
      dot: "bg-red-400",
    },
    {
      label: t("platformFees"),
      value: summary.totalPlatformFees.toFixed(2),
      sub: t("ordersOnly"),
      bg: "from-cyan-400/30 to-cyan-200/20",
      text: "text-cyan-700",
      dot: "bg-cyan-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6 print:grid-cols-3">
      {cards.map((card) => (
        <SummaryCard key={card.label} {...card} />
      ))}
    </div>
  );
}

function SummaryCard({ label, value, sub, bg, text, dot }: any) {
  return (
    <div
      className={`w-full rounded-2xl p-[1px] bg-gradient-to-br ${bg}
      shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
    >
      <div className="rounded-2xl bg-white p-4 h-full">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold tabular-nums mt-2 ${text}`}>
          {value}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">{sub}</p>
          <div className={`h-2 w-2 rounded-full ${dot} opacity-60`} />
        </div>
      </div>
    </div>
  );
}
