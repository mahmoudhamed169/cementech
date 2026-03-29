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

type UserStatus = "active" | "inactive" | "blocked" | "all";

export default function UsersFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("userPage.userStatus");

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const userStatuses: UserStatus[] = ["all", "active", "inactive", "blocked"];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#475467] whitespace-nowrap">
        {t("status")} {/* ✅ */}
      </span>
      <Select
        defaultValue={searchParams.get("status") ?? "all"}
        onValueChange={handleFilter}
      >
        <SelectTrigger className="h-10 rounded-xl border-zinc-300 text-sm">
          <SelectValue placeholder={t("all")} />
        </SelectTrigger>
        <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
          {userStatuses.map((status) => (
            <SelectItem
              className="rounded-lg cursor-pointer hover:bg-zinc-50 focus:bg-zinc-50"
              key={status}
              value={status}
            >
              {t(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
