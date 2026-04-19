import { Fragment } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { InvoiceReportItem } from "@/src/lib/services/payments/get-invoice-report";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import EmptyTableState from "@/src/components/shared/empty-tablestate";

interface Props {
  payments: InvoiceReportItem[];
}

export function PaymentsTableBody({ payments }: Props) {
  if (payments.length === 0)
    return (
      <TableBody>
        <EmptyTableState colSpan={9} />
      </TableBody>
    );

  return (
    <TableBody>
      {payments.map((payment, index) => {
        const formattedDate = new Date(payment.created_at).toLocaleDateString(
          "en-GB",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          },
        );

        return (
          <Fragment key={payment.id}>
            {" "}
            {/* ← الإصلاح هنا */}
            <TableRow className="text-center h-16 border-b border-gray-100">
              <TableCell className="text-gray-500">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {payment.order_code}
              </TableCell>
              <TableCell className="text-gray-500 text-xs">
                {payment.invoice_code}
              </TableCell>
              <TableCell className="font-medium text-gray-800">
                {payment.customer_name}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <span>{payment.total}</span>
                  <CurrencyIcon />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <span>
                    {payment.delivery_fee ? payment.delivery_fee : "-"}
                  </span>
                  <CurrencyIcon />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <span>{payment.bank_fee}</span>
                  <CurrencyIcon />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <span>{payment.platform_fee}</span>
                  <CurrencyIcon />
                </div>
              </TableCell>
              <TableCell>
                <InvoiceStatusBadge status={payment.invoice_status} />
              </TableCell>
              <TableCell className="text-gray-500">{formattedDate}</TableCell>
            </TableRow>
          </Fragment>
        );
      })}
    </TableBody>
  );
}
