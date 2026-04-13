// payments/operations/_components/payments-filters.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/src/components/shared/date-picker";
import SearchInput from "@/src/components/shared/search-input";

interface Props {
  currentStatus?: string;
  currentTimeRange?: string;
  currentDate?: string;
}

export function PaymentsFilters({
  currentStatus,
  currentTimeRange,
  currentDate,
}: Props) {
  const t = useTranslations("PaymentsPage.operations.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [date, setDate] = useState<Date | undefined>(
    currentDate ? new Date(currentDate) : undefined,
  );

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

  const handleTimeRangeChange = (value: string) => {
    setDate(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("date");
    params.set("timeRange", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("timeRange");
    if (selectedDate) {
      params.set("date", format(selectedDate, "yyyy-MM-dd"));
    } else {
      params.delete("date");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div dir="rtl" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">المدفوعات</h3>

        <div className="flex items-center gap-3">
          <SearchInput placeholder="ابحث عن اسم السائق او رقم الطلب ...." />

          {/* Date Picker */}
          <DatePicker
            value={date}
            onChange={handleDateChange}
            placeholder={t("pickDate")}
          />

          {/* Time range */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 whitespace-nowrap">
              {t("byTime")}
            </label>
            <Select
              value={date ? "" : (currentTimeRange ?? "today")}
              onValueChange={handleTimeRangeChange}
              disabled={!!date}
            >
              <SelectTrigger className="min-h-12 py-1 ps-12 rounded-2xl w-40 border-gray-200 bg-white text-sm disabled:opacity-50">
                <SelectValue placeholder={t("today")} />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="today">{t("today")}</SelectItem>
                <SelectItem value="week">{t("week")}</SelectItem>
                <SelectItem value="month">{t("month")}</SelectItem>
                <SelectItem value="all">{t("all")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
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
              <SelectTrigger className="min-h-12 py-1 ps-12 rounded-2xl w-40 border-gray-200 bg-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-0">
                <SelectItem value="all">{t("allStatuses")}</SelectItem>
                <SelectItem value="fully paid">{t("fullyPaid")}</SelectItem>
                <SelectItem value="partially paid">{t("partiallyPaid")}</SelectItem>
                <SelectItem value="not paid">{t("notPaid")}</SelectItem>
                <SelectItem value="refunded">{t("refunded")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}