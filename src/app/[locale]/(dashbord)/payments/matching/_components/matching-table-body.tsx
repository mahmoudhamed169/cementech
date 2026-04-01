"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeliverBonusModal } from "./deliver-bonus-modal";

const STATIC_MATCHING = [
  {
    id: 1,
    driverId: "#1284",
    driverName: "أحمد علاء",
    driverPhone: "+966 123 456789",
    completedOrders: 10,
    totalEarnings: 21000,
    pendingBonus: 0,
    bonusStatus: "مكتمل",
    lastBonusDate: "10-01-2026",
    hasDocument: true,
    delivered: true,
  },
  {
    id: 2,
    driverId: "#1283",
    driverName: "علاء أحمد",
    driverPhone: "+966 123 456789",
    completedOrders: 123,
    totalEarnings: 21000,
    pendingBonus: 0,
    bonusStatus: "مكتمل",
    lastBonusDate: "10-01-2026",
    hasDocument: true,
    delivered: true,
  },
  {
    id: 3,
    driverId: "#1282",
    driverName: "مؤنس الشاوي",
    driverPhone: "+966 123 456789",
    completedOrders: 34,
    totalEarnings: 21000,
    pendingBonus: 45,
    bonusStatus: "قيد الانتظار",
    lastBonusDate: "20-01-2026",
    hasDocument: true,
    delivered: false,
  },
  {
    id: 4,
    driverId: "#1281",
    driverName: "محمود رزق",
    driverPhone: "+966 123 456789",
    completedOrders: 12,
    totalEarnings: 21000,
    pendingBonus: 0,
    bonusStatus: "مكتمل",
    lastBonusDate: "13-01-2026",
    hasDocument: true,
    delivered: true,
  },
];

export type Matching = (typeof STATIC_MATCHING)[number];

const statusStyles: Record<string, string> = {
  مكتمل: "bg-green-100 text-green-700",
  "قيد الانتظار": "bg-yellow-100 text-yellow-700",
};

interface Props {
  matching: Matching[];
}

export function MatchingTableBody({ matching }: Props) {
  const [selectedRow, setSelectedRow] = useState<Matching | null>(null);
  return (
    <>
    <TableBody>
      {matching.map((row, index) => (
        <TableRow
          key={row.id}
          className="text-center h-16 border-b border-gray-100"
        >
          <TableCell className="text-gray-500">{index + 1}</TableCell>
          <TableCell className="font-medium">{row.driverId}</TableCell>

          {/* Driver */}
          <TableCell>
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium text-gray-800">
                {row.driverName}
              </span>
              <span className="text-xs text-gray-400">{row.driverPhone}</span>
            </div>
          </TableCell>

          <TableCell>{row.completedOrders}</TableCell>
          <TableCell>﷼ {row.totalEarnings.toLocaleString("ar-SA")}</TableCell>
          <TableCell>﷼ {row.pendingBonus}</TableCell>

          {/* Status badge */}
          <TableCell>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                statusStyles[row.bonusStatus],
              )}
            >
              {row.bonusStatus}
            </span>
          </TableCell>

          <TableCell className="text-gray-500">{row.lastBonusDate}</TableCell>

          {/* Document download */}
          <TableCell>
            {row.hasDocument && (
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Download size={18} />
              </button>
            )}
          </TableCell>

          {/* Actions */}
          <TableCell>
            <Button
              size="sm"
              className={cn(
                "rounded-xl text-white text-xs w-24 h-9",
                row.delivered
                  ? "bg-gray-300 text-gray-500 cursor-default"
                  : "bg-green-600 hover:bg-green-700",
              )}
              disabled={row.delivered}
              onClick={() => !row.delivered && setSelectedRow(row)}
            >
              {row.delivered ? "تم التسليم" : "تسليم"}
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
     <DeliverBonusModal
        open={!!selectedRow}
        onOpenChange={(open) => !open && setSelectedRow(null)}
        bonusAmount={selectedRow?.pendingBonus ?? 0}
        driverName={selectedRow?.driverName ?? ""}
      />
      </>
  );
}

export { STATIC_MATCHING };
