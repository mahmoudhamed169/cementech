"use client"
import { useTranslations } from "next-intl";
import PageTitleWithBack from "../../../users/[id]/_components/page-title-with-back";

interface OrderPageTitleProps {
  orderCode?: string;
}

export default function OrderPageTitle({ orderCode }: OrderPageTitleProps) {
  const t = useTranslations("orders");
  return (
    <PageTitleWithBack
      title={
        orderCode ? `${t("orderNumber")} - #${orderCode}` : t("orderDetails")
      }
      backHref="/orders"
    />
  );
}
