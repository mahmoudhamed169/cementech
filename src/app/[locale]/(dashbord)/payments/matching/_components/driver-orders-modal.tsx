// matching/_components/driver-orders-modal.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeliverBonusModal } from "./deliver-bonus-modal";

interface Order {
  id: number;
  orderId: string;
  totalPrice: number;
  bonus: number;
  hasDocument: boolean;
  bonusStatus: "مكتمل" | "قيد الانتظار";
  bonusDate: string;
  delivered: boolean;
}

const STATIC_ORDERS: Order[] = [
  {
    id: 1,
    orderId: "#1281",
    totalPrice: 100000,
    bonus: 5000,
    hasDocument: true,
    bonusStatus: "قيد الانتظار",
    bonusDate: "10-01-2026",
    delivered: false,
  },
  {
    id: 2,
    orderId: "#1284",
    totalPrice: 30000,
    bonus: 1000,
    hasDocument: true,
    bonusStatus: "مكتمل",
    bonusDate: "10-01-2026",
    delivered: true,
  },
  {
    id: 3,
    orderId: "#1283",
    totalPrice: 48000,
    bonus: 1200,
    hasDocument: true,
    bonusStatus: "مكتمل",
    bonusDate: "20-01-2026",
    delivered: true,
  },
];

const statusStyles: Record<string, string> = {
  مكتمل: "bg-green-100 text-green-700",
  "قيد الانتظار": "bg-yellow-100 text-yellow-700",
};

const headers = [
  "index",
  "orderId",
  "totalPrice",
  "bonus",
  "document",
  "bonusStatus",
  "bonusDate",
] as const;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverName: string;
  driverId: string;
}

export function DriverOrdersModal({
  open,
  onOpenChange,
  driverName,
  driverId,
}: Props) {
  const t = useTranslations("PaymentsPage.matching.ordersModal");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white min-w-4xl rounded-2xl p-6" >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 mb-4">
              {t("title")}
            </DialogTitle>
          </DialogHeader>

          <Table>
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
            <TableBody>
              {STATIC_ORDERS.map((order, index) => (
                <TableRow
                  key={order.id}
                  className="text-center h-16 border-b border-gray-100"
                >
                  <TableCell className="text-gray-500">{index + 1}</TableCell>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>
                    ﷼ {order.totalPrice.toLocaleString("ar-SA")}
                  </TableCell>
                  <TableCell>﷼ {order.bonus.toLocaleString("ar-SA")}</TableCell>

                  {/* Document */}
                  <TableCell>
                    {order.hasDocument && (
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Download size={18} />
                      </button>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        statusStyles[order.bonusStatus],
                      )}
                    >
                      {order.bonusStatus}
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-500">
                    {order.bonusDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Deliver Bonus Modal */}
      <DeliverBonusModal
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        driverName={driverName}
      />
    </>
  );
}
