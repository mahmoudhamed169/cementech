// payments/operations/_components/payments-table-body.tsx
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  مكتمل: "bg-green-100 text-green-700",
  "قيد الانتظار": "bg-yellow-100 text-yellow-700",
  فشل: "bg-red-100 text-red-700",
};

interface Props {
  payments: any[];
}

export function PaymentsTableBody({ payments }: Props) {
  return (
    <TableBody>
      {payments.map((payment, index) => (
        <TableRow
          key={payment.id}
          className="text-center h-16 border-b border-gray-100"
        >
          <TableCell className="text-gray-500">{index + 1}</TableCell>
          <TableCell className="font-medium">{payment.transactionId}</TableCell>
          <TableCell>{payment.requestId}</TableCell>

          {/* Driver */}
          <TableCell>
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium text-gray-800">
                {payment.driverName}
              </span>
              <span className="text-xs text-gray-400">
                {payment.driverPhone}
              </span>
            </div>
          </TableCell>

          {/* Client */}
          <TableCell>
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium text-gray-800">
                {payment.clientName}
              </span>
              <span className="text-xs text-gray-400">
                {payment.clientPhone}
              </span>
            </div>
          </TableCell>

          <TableCell>﷼ {payment.amountPaid.toLocaleString("ar-SA")}</TableCell>
          <TableCell>﷼ {payment.commission}</TableCell>
          <TableCell>{payment.paymentMethod}</TableCell>

          {/* Status badge */}
          <TableCell>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                statusStyles[payment.paymentStatus],
              )}
            >
              {payment.paymentStatus}
            </span>
          </TableCell>

          <TableCell className="text-gray-500">
            {payment.transactionDate}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
