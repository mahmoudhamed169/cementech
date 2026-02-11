"use client";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InvoicesHeader() {
  const t = useTranslations("InvoicesPage.header");

  return (
    <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
      <div className="space-x-2">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p>{t("description")}</p>
      </div>
      <Button className="min-w-46  min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center">
        <Printer />
        {t("btn")}
      </Button>
    </div>
  );
}
