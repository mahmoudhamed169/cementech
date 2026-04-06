"use client";
import { useTranslations } from "next-intl";

const typeStyles = {
  with_data: "bg-[#ECFDF3] text-[#027A48]",
  without_data: "bg-[#EFF8FF] text-[#175CD3]",
} as const;

type RequestType = keyof typeof typeStyles;

export default function LoadingRequestTypeBadge({
  type,
}: {
  type: RequestType;
}) {
  const t = useTranslations("loadingRequestsPage.table.typeBadge");

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${typeStyles[type]}`}
    >
      {t(type)}
    </span>
  );
}
