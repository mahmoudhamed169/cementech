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

export default function TypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations(
    "loadingRequestsPage.loadingRequestHeader.typeFilter",
  );

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("type");
    } else {
      params.set("type", value);
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
        defaultValue={searchParams.get("type") ?? "ALL"}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-38 min-h-12 rounded-2xl border-zinc-300 bg-white text-sm text-zinc-400 focus:ring-2 focus:ring-soft-pink-300">
          <SelectValue placeholder={t("all")} />
        </SelectTrigger>
        <SelectContent className="bg-white border-none">
          <SelectItem value="ALL">{t("all")}</SelectItem>
          <SelectItem value="with_data">{t("with_data")}</SelectItem>
          <SelectItem value="without_data">{t("without_data")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
