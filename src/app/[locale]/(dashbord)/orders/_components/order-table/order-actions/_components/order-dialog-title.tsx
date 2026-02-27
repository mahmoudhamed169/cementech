"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface OrderDialogTitleProps {
  orderCode: string;
}

export default function OrderDialogTitle({ orderCode }: OrderDialogTitleProps) {
  const t = useTranslations("orderActions");

  return (
    <DialogHeader className="p-6">
      <DialogTitle className="text-[#101828] font-bold text-2xl">
        {t("orderNumber")} - {orderCode}# + ({t("invoice")})
      </DialogTitle>
    </DialogHeader>
  );
}
