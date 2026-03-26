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

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("loadingRequestsPage.loadingRequestHeader.filter");

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
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
        defaultValue={searchParams.get("status") ?? "ALL"}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-38 min-h-12 rounded-2xl border-zinc-300 bg-white text-sm text-zinc-400 focus:ring-2 focus:ring-soft-pink-300">
          <SelectValue placeholder={t("all")} />
        </SelectTrigger>
        <SelectContent className="bg-white border-none">
          <SelectItem value="ALL">{t("all")}</SelectItem>
          <SelectItem value="received">{t("received")}</SelectItem>
          <SelectItem value="approved">{t("approved")}</SelectItem>
          <SelectItem value="factory_arrival">
            {t("factory_arrival")}
          </SelectItem>
          <SelectItem value="loading">{t("loading")}</SelectItem>
          <SelectItem value="loaded">{t("loaded")}</SelectItem>
          <SelectItem value="rejected">{t("rejected")}</SelectItem>
          <SelectItem value="pending_payment">
            {t("pending_payment")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
