// matching/_components/matching-filters.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/src/components/shared/search-input";

interface Props {
  currentStatus?: string;
}

export function MatchingFilters({ currentStatus }: Props) {
  const t = useTranslations("PaymentsPage.matching.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{t("title")}</h3>

        <div className="flex items-center gap-3">
          <SearchInput placeholder={t("searchPlaceholder")} />
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 whitespace-nowrap">
              {t("byStatus")}
            </label>
            <Select
              value={currentStatus ?? "all"}
              onValueChange={(value) =>
                updateParam("status", value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="min-h-12 py-1 px-4 rounded-2xl w-40 border-gray-200 bg-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="completed">{t("completed")}</SelectItem>
                <SelectItem value="pending">{t("pending")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
