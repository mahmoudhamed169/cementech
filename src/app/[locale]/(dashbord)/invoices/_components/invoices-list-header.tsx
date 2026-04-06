"use client";

import SearchInput from "@/src/components/shared/search-input";
import { useTranslations } from "next-intl";
import InvoiceTypeFilter from "./invoice-type-filter";

export default function InvoicesListHeader() {
  const t = useTranslations("InvoicesPage.invoicesTable");

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>
      <div className="flex flex-wrap items-center gap-4">
        <InvoiceTypeFilter />
        <div className="w-65">
          <SearchInput placeholder="ابحث عن رقم الطلب او رقم الفاتورة ..." />
        </div>
      </div>
    </div>
  );
}
