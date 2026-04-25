"use client";
import { Link } from "@/src/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface PageTitleWithBackProps {
  title: string;
  backHref: string;
}

export default function PageTitleWithBack({
  title,
  backHref,
}: PageTitleWithBackProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4 mb-10">
      <h1 className="text-3xl font-bold text-[#101828]">{title}</h1>

      <Link
        href={backHref as any}
        className="text-lg font-semibold mt-2 flex items-center text-[#344054] gap-1"
      >
        {t("back")}
        {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </Link>
    </div>
  );
}
