"use client";

import { useTranslations } from "next-intl";

interface OrderDialogTitleProps {
  orderCode: string;
}

export default function OrderDialogTitle({ orderCode }: OrderDialogTitleProps) {
  const t = useTranslations("orderActions");

  return (
    <div className="pb-4 ">
      <h2 className="text-[#101828] font-bold text-xl">
        {t("orderNumber")} - {orderCode}
      </h2>
    </div>
  );
}
