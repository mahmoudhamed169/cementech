"use client";
import SearchInput from "@/src/components/shared/search-input";
import DriversFilter from "./drivers-filter";
import { useTranslations } from "next-intl";

export default function DriversHeaderList() {
  const t = useTranslations("driverPage.driversHeaderList");

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>

      <div className="flex flex-wrap items-center gap-4">
        <DriversFilter />
        <div className="w-65">
          <SearchInput placeholder={t("searchPlaceholder")} />
        </div>
      </div>
    </div>
  );
}
