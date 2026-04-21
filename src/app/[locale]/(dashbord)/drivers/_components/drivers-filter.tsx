"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DriverStatus =
  | "offline"
  | "free"
  | "waiting_order"
  | "delivering"
  | "blocked"
  | "pending";

type LoadingStatus = "loaded" | "not loaded" | "pending";

export default function DriversFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tDriverStatus = useTranslations("driverPage.driverStatus");
  const tLoadingStatus = useTranslations("driverPage.loadingStatus");
  const t = useTranslations("driverPage.driversFilter");

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

  const driverStatuses: DriverStatus[] = [
    "free",
    "offline",
    "pending",
    "blocked",
  
    "delivering",
  ];
  const loadingStatuses: LoadingStatus[] = ["loaded", "not loaded", "pending"];

  return (
    <div className="flex items-center gap-3">
      {/* حالة التحميل */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#475467] whitespace-nowrap">
          {t("loadingStatus")}
        </span>
        <Select
          defaultValue={searchParams.get("loadingStatus") ?? "all"}
          onValueChange={(value) => handleFilter("loadingStatus", value)}
        >
          <SelectTrigger className="h-10 rounded-xl border-zinc-300 text-sm">
            <SelectValue placeholder={t("all")} />
          </SelectTrigger>
          <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
            <SelectItem
              className="rounded-lg cursor-pointer hover:bg-zinc-50 focus:bg-zinc-50"
              value="all"
            >
              {t("all")}
            </SelectItem>
            {loadingStatuses.map((status) => (
              <SelectItem
                className="rounded-lg cursor-pointer hover:bg-zinc-50 focus:bg-zinc-50"
                key={status}
                value={status}
              >
                {tLoadingStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* حالة السائق */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#475467] whitespace-nowrap">
          {t("driverStatus")}
        </span>
        <Select
          defaultValue={searchParams.get("driverStatus") ?? "all"}
          onValueChange={(value) => handleFilter("driverStatus", value)}
        >
          <SelectTrigger className="h-10 rounded-xl border-zinc-300 text-sm">
            <SelectValue placeholder={t("all")} />
          </SelectTrigger>
          <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
            <SelectItem
              className="rounded-lg cursor-pointer hover:bg-zinc-50 focus:bg-zinc-50"
              value="all"
            >
              {t("all")}
            </SelectItem>
            {driverStatuses.map((status) => (
              <SelectItem
                className="rounded-lg cursor-pointer hover:bg-zinc-50 focus:bg-zinc-50"
                key={status}
                value={status}
              >
                {tDriverStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
