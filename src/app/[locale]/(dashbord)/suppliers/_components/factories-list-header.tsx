"use client";
import SearchInput from "@/src/components/shared/search-input";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function FactoriesListHeader() {
  const t = useTranslations("suppliersPage.factoriesListHeader");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleActiveFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("is_active");
    } else {
      params.set("is_active", value);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const current = searchParams.get("is_active") ?? "true";

  const filters = [
    {
      label: t("filter.all"),
      value: "all",
      activeClass: "bg-white text-[#101828] shadow-sm",
    },
    {
      label: t("filter.active"),
      value: "true",
      activeClass: "bg-white text-green-600 shadow-sm",
    },
    {
      label: t("filter.inactive"),
      value: "false",
      activeClass: "bg-white text-red-500 shadow-sm",
    },
  ];

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>
      <div className="flex flex-wrap items-center gap-4">
        {/* فلتر الحالة */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                current === f.value
                  ? `${f.activeClass} font-semibold`
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* سيرش */}
        <div className="w-65">
          <SearchInput placeholder={t("search.placeholder")} />
        </div>
      </div>
    </div>
  );
}
