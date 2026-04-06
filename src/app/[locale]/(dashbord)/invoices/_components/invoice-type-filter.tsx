"use client";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const types = ["orders", "requests"] as const;
type InvoiceType = (typeof types)[number];

const activeStyles: Record<InvoiceType, string> = {
  orders: "bg-[#4F39F6] text-white",
  requests: "bg-[#4F39F6] text-white",
};

export default function InvoiceTypeFilter() {
  const t = useTranslations("InvoicesPage.invoicesTable.typeFilter");
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("invoice_type") as InvoiceType) ?? "orders";

  const handleChange = (type: InvoiceType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("invoice_type", type);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center bg-[#F3F4F6] rounded-2xl p-1 gap-1">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => handleChange(type)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${current === type ? activeStyles[type] : "text-[#6B7280] hover:text-[#111827]"}`}
        >
          {t(type)}
        </button>
      ))}
    </div>
  );
}
