"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DriverOrdersModal } from "./driver-orders-modal";
import { DriverFinancialStat } from "@/src/lib/services/payments/matching-stats";
const statusStyles: Record<string, string> = {
  مدفوع: "bg-green-100 text-green-700",
  "قيد الانتظار": "bg-yellow-100 text-yellow-700",
};
interface Props {
  matching: DriverFinancialStat[];
}
export function MatchingTableBody({ matching }: Props) {
  const [ordersRow, setOrdersRow] = useState<DriverFinancialStat | null>(null);
  return (
    <>
      <TableBody>
        {matching.map((row, index) => (
          <TableRow
            key={row.driverId}
            className="text-center h-16 border-b border-gray-100"
          >
            <TableCell className="text-gray-500">{index + 1}</TableCell>
            <TableCell className="font-medium">{row.driverCode}</TableCell>
            {/* Driver */}
            <TableCell>
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-medium text-gray-800">
                  {row.driverName}
                </span>
                <span className="text-xs text-gray-400">{row.phoneNumber}</span>
              </div>
            </TableCell>
            <TableCell>{row.ordersCompleted}</TableCell>
            <TableCell>{row.totalEarning.toLocaleString("en-US")}</TableCell>
            <TableCell>{row.pendingEarning.toLocaleString("en-US")}</TableCell>
            {/* Status badge */}
            <TableCell>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  statusStyles[row.earningStatus],
                )}
              >
                {row.earningStatus}
              </span>
            </TableCell>
            <TableCell className="text-gray-500">
              {row.lastPayment ?? "—"}
            </TableCell>
           
            {/* Actions */}
            <TableCell>
              <button
                onClick={() => setOrdersRow(row)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Eye size={18} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <DriverOrdersModal
        open={!!ordersRow}
        onOpenChange={(open) => !open && setOrdersRow(null)}
        driverName={ordersRow?.driverName ?? ""}
        driverId={ordersRow?.driverId ?? ""}
      />
    </>
  );
}
