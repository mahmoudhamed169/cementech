"use client";
import { useTranslations } from "next-intl";

export default function UserOrdersHeader() {
  const t = useTranslations("userPage.userOrderTable");

  return <h4 className="font-bold text-[#101828] text-lg">{t("title")}</h4>;
}
