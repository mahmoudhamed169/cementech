import { calcSummary } from "@/src/lib/utils/transactions-report.utils";
import { Transaction } from "@/src/lib/services/payments/get-transactions-report";

interface Props {
  transactions: Transaction[];
}

const CARDS = (summary: ReturnType<typeof calcSummary>) => [
  {
    label: "إجمالي المعاملات",
    value: String(summary.totalTransactions),
    sub: "كل الأنواع",
    bg: "from-blue-400/30 to-blue-200/20",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  {
    label: "المبالغ المحصلة",
    value: summary.totalCaptured.toFixed(2),
    sub: "captured فقط",
    bg: "from-green-400/30 to-green-200/20",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  {
    label: "تكلفة الأسمنت",
    value: String(summary.totalCement),
    sub: "الطلبات فقط",
    bg: "from-orange-400/30 to-orange-200/20",
    text: "text-orange-700",
    dot: "bg-orange-400",
  },
  {
    label: "تكلفة التوصيل",
    value: String(summary.totalDelivery),
    sub: "الطلبات فقط",
    bg: "from-purple-400/30 to-purple-200/20",
    text: "text-purple-700",
    dot: "bg-purple-400",
  },
  {
    label: "رسوم البنك",
    value: String(summary.totalBankFees),
    sub: "الطلبات فقط",
    bg: "from-red-400/30 to-red-200/20",
    text: "text-red-700",
    dot: "bg-red-400",
  },
  {
    label: "عمولة المنصة",
    value: String(summary.totalPlatformFees),
    sub: "الطلبات فقط",
    bg: "from-cyan-400/30 to-cyan-200/20",
    text: "text-cyan-700",
    dot: "bg-cyan-400",
  },
];

export function TransactionsSummaryCards({ transactions }: Props) {
  const summary = calcSummary(transactions);
  const cards = CARDS(summary);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card) => (
        <SummaryCard key={card.label} {...card} />
      ))}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  bg,
  text,
  dot,
}: {
  label: string;
  value: string;
  sub: string;
  bg: string;
  text: string;
  dot: string;
}) {
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
