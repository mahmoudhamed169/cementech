import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

const ordersHeaders = [
  "index",
  "invoicesId",
  "orderId",
  "userName",
  "userPhoneNumber",
  "totalPaid",
  "date",
  "actions",
] as const;

const requestsHeaders = [
  "index",
  "invoicesId",
  "orderId",
  "driverName",
  "driverPhoneNumber",
  "totalPaid",
  "date",
  "actions",
] as const;

export default function InvoicesTableHeader({
  invoiceType,
}: {
  invoiceType: string;
}) {
  const t = useTranslations("InvoicesPage.invoicesTable.columns");
  const headers = invoiceType === "requests" ? requestsHeaders : ordersHeaders;

  return (
    <TableHeader>
      <TableRow>
        {headers.map((key) => (
          <TableHead
            key={key}
            className="text-center text-[#364153] font-bold h-11"
          >
            {t(key)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
