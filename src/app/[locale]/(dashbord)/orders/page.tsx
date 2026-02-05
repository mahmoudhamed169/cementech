"use client";
import { useTranslations } from "next-intl";

export default function OrderPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("orderPage")}</h1>
    </div>
  );
}
