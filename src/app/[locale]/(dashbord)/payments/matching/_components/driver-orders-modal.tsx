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

import { Download, Inbox, Loader2, HandCoins, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeliverBonusModal } from "./deliver-bonus-modal";
import { DriverOrder, useDriverOrders } from "../_hooks/use-driver-orders";

const headers = [
  "index",
  "orderId",
  "totalPrice",
  "bonus",
  "document",
  "bonusStatus",
  "bonusDate",
  "deliver",
] as const;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverName: string;
  driverId: string;
}

const statusKeyMap: Record<string, string> = {
  Paid: "status.paid",
  "Not paid": "status.notPaid",
};

function getStatusStyle(status: string) {
  return status === "Paid"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";
}

export function DriverOrdersModal({
  open,
  onOpenChange,
  driverName,
  driverId,
}: Props) {
  const t = useTranslations("PaymentsPage.matching.ordersModal");

  const { orders, isLoading, error } = useDriverOrders(driverId);

  // single order (for individual deliver button)
  const [selectedOrder, setSelectedOrder] = useState<DriverOrder | null>(null);

  // multi-select set of order ids
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // bulk deliver modal
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  function toggleRow(order: DriverOrder) {
    if (order.earning_status === "Paid") return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(order.id) ? next.delete(order.id) : next.add(order.id);
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  const selectedCount = selectedIds.size;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) clearSelection();
          onOpenChange(v);
        }}
      >
        <DialogContent className="bg-white min-w-4xl rounded-2xl p-6 border-none shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 mb-4 text-center">
              {t("title")}
            </DialogTitle>
          </DialogHeader>

          {/* ─── Bulk Toolbar ─────────────────────────────────────── */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              selectedCount > 0
                ? "max-h-20 opacity-100 mb-3"
                : "max-h-0 opacity-0 mb-0",
            )}
          >
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
              <span className="text-sm text-green-700 font-medium">
                {selectedCount} {t("selectedOrders")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearSelection}
                  className="text-xs text-gray-400 hover:text-gray-600 transition px-2 py-1"
                >
                  {t("clearSelection")}
                </button>
                <button
                  onClick={() => setBulkModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition"
                >
                  <HandCoins size={15} />
                  {t("deliverSelected")}
                </button>
              </div>
            </div>
          </div>

          {/* ─── Table ────────────────────────────────────────────── */}
          <Table className="overflow-hidden rounded-xl border-none">
            <TableHeader>
              <TableRow className="border-0">
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

            <TableBody className="[&_tr]:border-0 [&_tr+tr]:border-t [&_tr+tr]:border-gray-100/80">
              {/* 🔄 Loading */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">{t("loading")}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* ❌ Error */}
              {error && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="flex justify-center items-center py-10 text-red-500">
                      {t("error")}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* 📦 Data */}
              {!isLoading &&
                !error &&
                orders.map((order, index) => {
                  const isPaid = order.earning_status === "Paid";
                  const isChecked = selectedIds.has(order.id);

                  return (
                    <TableRow
                      key={order.id}
                      onClick={() => toggleRow(order)}
                      className={cn(
                        "text-center h-16 transition-colors",
                        !isPaid && "cursor-pointer",
                        isChecked
                          ? "bg-green-50 hover:bg-green-50"
                          : !isPaid && "hover:bg-gray-50",
                      )}
                    >
                      {/* Index or Checkbox */}
                      <TableCell className="text-gray-500">
                        {!isPaid ? (
                          <div
                            className={cn(
                              "w-5 h-5 rounded-md border-2 mx-auto flex items-center justify-center transition-colors",
                              isChecked
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 bg-white",
                            )}
                          >
                            {isChecked && (
                              <Check
                                size={12}
                                className="text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </TableCell>

                      <TableCell className="font-medium">
                        {order.orderCode}
                      </TableCell>

                      <TableCell>
                        {order.total.toLocaleString("en-US")}
                      </TableCell>

                      <TableCell>
                        {order.delivery_money.toLocaleString("en-US")}
                      </TableCell>

                      {/* 📄 Document */}
                      <TableCell>
                        {order.invoice_picture ? (
                          <a
                            href={order.invoice_picture}
                            target="_blank"
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
                          >
                            <Download size={18} />
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </TableCell>

                      {/* 📊 Status */}
                      <TableCell>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            getStatusStyle(order.earning_status),
                          )}
                        >
                          {t(statusKeyMap[order.earning_status])}
                        </span>
                      </TableCell>

                      {/* 📅 Date */}
                      <TableCell className="text-gray-500">
                        {new Date(order.updated_at).toLocaleDateString("en-US")}
                      </TableCell>

                      {/* ✅ Deliver */}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {isPaid ? (
                          <button
                            disabled
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed"
                          >
                            {t("delivered")}
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition"
                          >
                            {t("deliver")}
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {/* 🚫 Empty */}
              {!isLoading && !error && orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <Inbox size={48} className="mb-3 opacity-60" />
                      <p className="text-lg font-medium">{t("empty.title")}</p>
                      <span className="text-sm mt-1">
                        {t("empty.description")}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* 💰 Single Deliver Modal */}
      <DeliverBonusModal
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        driverName={driverName}
      />

      {/* 💰 Bulk Deliver Modal */}
      <DeliverBonusModal
        open={bulkModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setBulkModalOpen(false);
            clearSelection();
          }
        }}
        driverName={driverName}
      />
    </>
  );
}
