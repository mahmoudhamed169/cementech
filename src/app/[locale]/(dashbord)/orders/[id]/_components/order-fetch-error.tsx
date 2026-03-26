"use client";
import { useTranslations } from "next-intl";
import { PackageSearch } from "lucide-react";

export default function OrderFetchError() {
  const t = useTranslations("orders");
  return (
    <div className="flex flex-col items-center justify-center h-60 gap-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
          <PackageSearch className="w-10 h-10 text-orange-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-gray-700 font-semibold text-base">
          {t("fetchError")}
        </p>
        <p className="text-gray-400 text-sm">{t("fetchErrorSub")}</p>
      </div>
    </div>
  );
}
