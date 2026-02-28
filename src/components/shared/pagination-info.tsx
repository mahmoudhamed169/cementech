"use client";

import { useTranslations } from "next-intl";

type EntityType = "users" | "drivers" | "orders" | "loadingRequests";

interface PaginationInfoProps {
  from: number;
  to: number;
  total: number;
  type: EntityType;
}

export default function PaginationInfo({
  from,
  to,
  total,
  type,
}: PaginationInfoProps) {
  const t = useTranslations("pagination");

  return (
    <div className="mt-auto pt-4 ">
      <h3 className="text-end text-sm text-[#475467]">
        {t("showing")} ({from}-{to}) {t("of")} {total} {t(type)}
      </h3>
    </div>
  );
}
