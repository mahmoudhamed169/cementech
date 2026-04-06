import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import {
  Invoice,
  isOrderInvoice,
  isRequestInvoice,
} from "@/src/lib/types/invoices/invoice";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { InvoiceModalContent } from "./invoice";
import { RequestInvoiceModalContent } from "./invoice/request-invoice";

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

          {/* order/request code */}
          <TableCell className="text-center font-medium">
            {isOrderInvoice(item)
              ? `#${item.order_code}`
              : isRequestInvoice(item)
                ? `#${item.request_code}`
                : "-"}
          </TableCell>

          {/* name & phone */}
          {isOrderInvoice(item) ? (
            <>
              <TableCell className="text-center">
                {item.customer_name}
              </TableCell>
              <TableCell className="text-center">
                {item.customer_phone}
              </TableCell>
            </>
          ) : isRequestInvoice(item) ? (
            <>
              <TableCell className="text-center">{item.driver_name}</TableCell>
              <TableCell className="text-center">{item.driver_phone}</TableCell>
            </>
          ) : null}

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
          {/* actions */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-2">
              {isOrderInvoice(item) ? (
                <InvoiceModalContent id={item.id} />
              ) : isRequestInvoice(item) ? (
                <RequestInvoiceModalContent id={item.id} />
              ) : null}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
