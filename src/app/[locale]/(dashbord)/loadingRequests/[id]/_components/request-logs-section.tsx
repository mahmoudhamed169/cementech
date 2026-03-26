"use client";

import { useTranslations, useLocale } from "next-intl";
import { RequestLog } from "@/src/lib/services/loading-requests/getRequestById";
import { CheckCircle } from "lucide-react";

interface RequestLogsSectionProps {
  logs: RequestLog[];
}

export default function RequestLogsSection({ logs }: RequestLogsSectionProps) {
  const t = useTranslations("loadingRequestsPage.detailsPage.logsSection");
  const locale = useLocale();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-[#101828] rounded-full" />
        <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-[#101828]">
                {locale === "ar" ? log.message_ar : log.message_en}
              </p>
              <p className="text-xs text-[#6A7282]">
                {new Date(log.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
