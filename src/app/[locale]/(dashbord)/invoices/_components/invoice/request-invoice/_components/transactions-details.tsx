import { RequestInvoiceTransaction } from "@/src/lib/types/invoices/request-invoice-details";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusMap: Record<string, string> = {
  captured: "مكتمل",
  pending: "معلق",
  failed: "فشل",
};

export default function TransactionDetails({
  transactions,
}: {
  transactions: RequestInvoiceTransaction[];
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل المعاملات</h2>
      <Table>
        <TableHeader className="border-[#F3F4F6]">
          <TableRow>
            {["رقم المعاملة", "المزود", "المبلغ", "الحالة", "التاريخ"].map(
              (h) => (
                <TableHead
                  key={h}
                  className="text-center text-[#364153] font-bold h-11 bg-[#E5E7EB]"
                >
                  {h}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id} className="text-[#364153] border-[#F3F4F6]">
              <TableCell className="text-center">
                #{tx.paymob_transaction_id}
              </TableCell>
              <TableCell className="text-center capitalize">
                {tx.provider}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center gap-1">
                  {tx.amount} <CurrencyIcon />
                </div>
              </TableCell>
              <TableCell className="text-center">
                {statusMap[tx.status] ?? tx.status}
              </TableCell>
              <TableCell className="text-center">
                {new Date(tx.created_at).toLocaleDateString("ar-SA")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
