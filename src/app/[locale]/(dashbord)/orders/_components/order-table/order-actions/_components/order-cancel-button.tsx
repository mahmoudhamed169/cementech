"use client";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";

export default function OrderCancelButton() {
  const t = useTranslations("orderActions");

  return (
    <Button
      variant="outline"
      className="w-full bg-[#E7000B] border-0 text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-600"
    >
      <CircleX className="w-5 h-5" />
      {t("cancelOrder")}
    </Button>
  );
}
