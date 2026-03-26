"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function TimeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations(
    "loadingRequestsPage.loadingRequestHeader.timeFilter",
  );

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("time");
    } else {
      params.set("time", value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#475467] whitespace-nowrap">
        {t("filterLabel")}
      </span>
      <Select
        defaultValue={searchParams.get("time") ?? "all"}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-27 min-h-12 rounded-2xl border-zinc-300 bg-white text-sm text-zinc-400 focus:ring-2 focus:ring-soft-pink-300">
          <SelectValue placeholder={t("all")} />
        </SelectTrigger>
        <SelectContent className="bg-white border-none">
          <SelectItem value="all">{t("all")}</SelectItem>
          <SelectItem value="today">{t("today")}</SelectItem>
          <SelectItem value="this_week">{t("this_week")}</SelectItem>
          <SelectItem value="this_month">{t("this_month")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
