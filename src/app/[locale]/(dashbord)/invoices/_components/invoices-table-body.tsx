import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { Invoice } from "@/src/lib/types/invoices/invoice";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { InvoiceModalContent } from "./invoice";

export default function InvoicesTableBody({
  invoices,
}: {
  invoices: Invoice[];
}) {
  return (
    <TableBody>
      {invoices.map((item, index) => (
        <TableRow
          key={item.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          <TableCell className="text-center">{index + 1}</TableCell>

          {/* invoice code */}
          <TableCell className="text-center font-medium">
            #{item.code}
          </TableCell>

          {/* order code */}
          <TableCell className="text-center font-medium">
            {item.order_code ? `#${item.order_code}` : "-"}
          </TableCell>

          {/* customer name */}
          <TableCell className="text-center font-medium">
            {item.customer_name ?? "-"}
          </TableCell>

          {/* customer phone */}
          <TableCell className="text-center text-[#6A7282]">
            {item.customer_phone ?? "-"}
          </TableCell>

          {/* total amount */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span>{item.total_amount}</span>
              <CurrencyIcon />
            </div>
          </TableCell>

          {/* created at */}
          <TableCell className="text-center">
            <TimeAgo time={item.created_at} />
          </TableCell>

          {/* actions */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-2">
              <InvoiceModalContent id={item.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
