"use client";

import { useTranslations } from "next-intl";
import { LoadingRequestStatusBadge } from "../../../_components/loading-qequest-status-badge";

interface RequestStatusCellProps {
  status: string;
}

export default function RequestStatusCell({ status }: RequestStatusCellProps) {
  const t = useTranslations("loadingRequestsPage.detailsPage");

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] w-full">
      <span className="text-[#101828] font-semibold text-base">
        {t("orderStatus")}
      </span>
      <LoadingRequestStatusBadge status={status} />
    </div>
  );
}
