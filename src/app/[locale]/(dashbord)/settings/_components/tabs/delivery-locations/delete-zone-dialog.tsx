"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteDeliveryLocation } from "../../../_hooks/delivery/use-delete-delivery-location";
import { useTranslations } from "next-intl";

type Props = {
  id: string;
  nameAr: string;
  open: boolean;
  onClose: () => void;
};

export default function DeleteZoneDialog({ id, nameAr, open, onClose }: Props) {
  const { mutateAsync: deleteZone, isPending } = useDeleteDeliveryLocation();
  const t = useTranslations("settingsPage.tabs.delivery.deleteDialog");

  const handleDelete = async () => {
    await deleteZone(id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-0 max-w-md p-8">
        <DialogHeader>
          <div className="flex flex-col items-center text-center gap-6 mb-2">
            {/* Icon */}
            <div className="relative flex items-center justify-center w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-red-100" />
              <div className="absolute inset-[5px] rounded-full border border-red-100 bg-red-50/80" />
              <div className="absolute inset-[10px] rounded-full bg-red-50" />
              <Trash2 size={28} className="relative text-red-500 z-10" />
            </div>

            <div className="space-y-2.5">
              <DialogTitle className="text-gray-800 text-xl font-bold">
                {t("title")}
              </DialogTitle>
              <DialogDescription className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                {t("description")}{" "}
                <span className="font-semibold text-gray-600">{nameAr}</span>{" "}
                {t("descriptionSuffix")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2" />

        <DialogFooter className="flex-row gap-3 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 h-11 border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-100"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              t("confirm")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
