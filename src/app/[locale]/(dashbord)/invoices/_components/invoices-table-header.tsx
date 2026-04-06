import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

const headers = [
  "index",
  "invoicesId",
  "orderId",
  "userName",
  "userPhoneNumber",
  "totalPaid",
  "date",
  "actions",
] as const;

export default function InvoicesTableHeader() {
  const t = useTranslations("InvoicesPage.invoicesTable.columns");

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
