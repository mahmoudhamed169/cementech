import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type InvoiceStatus = "fully paid" | "partially paid" | "not paid" | "refunded";

const statusStyles: Record<InvoiceStatus, string> = {
  "fully paid": "bg-green-100 text-green-700",
  "partially paid": "bg-yellow-100 text-yellow-700",
  "not paid": "bg-red-100 text-red-700",
  refunded: "bg-blue-100 text-blue-700",
};

const statusKeys: Record<InvoiceStatus, string> = {
  "fully paid": "fullyPaid",
  "partially paid": "partiallyPaid",
  "not paid": "notPaid",
  refunded: "refunded",
};

interface Props {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: Props) {
  const t = useTranslations("PaymentsPage.operations.invoiceStatus");

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
        statusStyles[status],
      )}
    >
      {t(statusKeys[status])}
    </span>
  );
}
