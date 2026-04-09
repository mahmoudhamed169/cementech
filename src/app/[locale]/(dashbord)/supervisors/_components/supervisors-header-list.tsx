"use client";

import SearchInput from "@/src/components/shared/search-input";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SupervisorsHeaderList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("supervisorsPage");

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>

      <div className="flex flex-wrap items-center gap-4">
        <div className="w-65">
          <SearchInput placeholder={t("header.searchPlaceholder")} />
        </div>

        {/* Status Filter */}
        <FilterBox label={t("filter.statusFilter")}>
          <Select
            defaultValue={searchParams.get("status") ?? "all"}
            onValueChange={(value) => handleFilter("status", value)}
          >
            <SelectTrigger className="w-[120px] h-10 text-sm text-[#101828] bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl min-h-10.5 px-3 hover:bg-white focus:ring-2 focus:ring-[#155DFC]/30 transition-all duration-150">
              <SelectValue placeholder={t("status.all")} />
            </SelectTrigger>
            <SelectContent
              align="end"
              className="w-[130px] rounded-lg border border-[#E5E7EB] shadow-lg bg-white"
            >
              <SelectItem
                value="all"
                className="text-sm px-2 py-1 rounded-md hover:bg-[#F2F4F7] data-[state=checked]:bg-[#155DFC]/10"
              >
                {t("status.all")}
              </SelectItem>
              <SelectItem
                value="active"
                className="text-sm px-2 py-1 rounded-md hover:bg-[#F2F4F7] data-[state=checked]:bg-[#155DFC]/10"
              >
                {t("status.active")}
              </SelectItem>
              <SelectItem
                value="inactive"
                className="text-sm px-2 py-1 rounded-md hover:bg-[#F2F4F7] data-[state=checked]:bg-[#155DFC]/10"
              >
                {t("status.inactive")}
              </SelectItem>
              <SelectItem
                value="blocked"
                className="text-sm px-2 py-1 rounded-md hover:bg-[#F2F4F7] data-[state=checked]:bg-[#155DFC]/10"
              >
                {t("status.blocked")}
              </SelectItem>
            </SelectContent>
          </Select>
        </FilterBox>
      </div>
    </div>
  );
}

function FilterBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#4A5565] whitespace-nowrap">{label}</span>
      {children}
    </div>
  );
}
