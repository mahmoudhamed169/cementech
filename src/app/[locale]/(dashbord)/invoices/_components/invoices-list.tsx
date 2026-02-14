import SearchInput from "@/src/components/shared/search-input";
import { useTranslations } from "next-intl";
import InvoicesTable from "./invoices-table";

export default function InvoicesList() {
  const t = useTranslations("InvoicesPage.invoicesTable");
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>

        <div className="flex flex-wrap items-center gap-4">
          <div className="w-65">
            <SearchInput placeholder="ابحث عن رقم الطلب او رقم الفاتورة ..." />
          </div>
        </div>
      </div>

      {/* invoices table */}
      <div className="flex-1 mt-4">
        <InvoicesTable />
      </div>

      {/* Pagination / Info */}
      <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
        <h3 className="text-end text-sm text-[#475467]">
          عرض (1-8) من أصل 150 مستخدم
        </h3>
      </div>
    </section>
  );
}
