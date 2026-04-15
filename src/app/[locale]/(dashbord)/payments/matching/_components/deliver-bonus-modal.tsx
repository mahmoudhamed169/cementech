"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useDeliverSingleBonus,
  useDeliverBulkBonus,
} from "../_hooks/use-deliver-bonus";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driverName: string;
  driverId: string;
  totalBonus?: number;
  ordersCount?: number;
  orderId?: string;
  orderIds?: string[];
}

export function DeliverBonusModal({
  open,
  onOpenChange,
  driverName,
  driverId,
  totalBonus,
  ordersCount,
  orderId,
  orderIds,
}: Props) {
  const t = useTranslations("PaymentsPage.matching.deliverModal");
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const isBulk = !!orderIds?.length;

  const singleMutation = useDeliverSingleBonus(driverId);
  const bulkMutation = useDeliverBulkBonus(driverId);

  const isLoading = singleMutation.isPending || bulkMutation.isPending;

  useEffect(() => {
    if (totalBonus !== undefined) {
      setAmount(totalBonus.toString());
    }
  }, [totalBonus]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFile(null);
    setAmount("");
    setNote("");
  };

  const handleConfirm = async () => {
    if (!file || !amount) return;

    if (isBulk) {
      await bulkMutation.mutateAsync({
        orderIds: orderIds!,
        invoice_picture: file,
        amount,
        note,
      });
    } else if (orderId) {
      await singleMutation.mutateAsync({
        orderId,
        invoice_picture: file,
        amount,
        note,
      });
    }

    onOpenChange(false);
    resetForm();
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-xl rounded-2xl p-6" dir="rtl">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 text-center">
          {t("description")}
        </div>

        {/* Total Bonus Summary */}
        {totalBonus !== undefined && (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-gray-700">
                {t("totalBonus")}
              </span>
              {ordersCount !== undefined && (
                <span className="text-xs text-gray-400">
                  {ordersCount === 1
                    ? t("singleOrder")
                    : `${ordersCount} ${t("multipleOrders")}`}
                </span>
              )}
            </div>
            <span className="text-xl font-bold text-green-700">
              {totalBonus.toLocaleString("en-US")} ﷼
            </span>
          </div>
        )}

        {/* Upload Icon */}
        <div className="flex justify-center py-4">
          <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center relative">
            <FileText className="text-blue-300" size={64} />
            <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Upload className="text-white" size={18} />
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bonus Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-600">
              {t("bonusAmount")} <span className="text-gray-400">(﷼)</span>
            </label>
            <input
              type="number"
              value={amount}
              readOnly
              className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none cursor-not-allowed text-gray-500"
            />
          </div>

          {/* Document Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-600">{t("document")}</label>
            <label
              className={cn(
                "h-12 rounded-xl border px-4 flex items-center gap-2 cursor-pointer text-sm transition-all",
                file
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-200 text-gray-400 hover:border-blue-300",
              )}
            >
              {file ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <FileText size={16} />
                  <span>{t("uploaded")}</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>{t("uploadDocument")}</span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Note Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-600">{t("note")}</label>
          <input
            type="text"
            placeholder={t("notePlaceholder")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl h-12 border-gray-200 text-gray-600"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {t("cancel")}
          </Button>
          <Button
            className="flex-1 rounded-xl h-12 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleConfirm}
            disabled={!file || !amount || isLoading}
          >
            {isLoading ? "..." : `✓ ${t("confirm")}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
