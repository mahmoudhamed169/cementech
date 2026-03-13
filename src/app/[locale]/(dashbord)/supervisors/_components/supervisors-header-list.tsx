"use client";
import { useTranslations } from "next-intl";

export default function SupervisorsHeaderList() {
  const t = useTranslations("supervisorsPage");

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>
    </div>
  );
}
