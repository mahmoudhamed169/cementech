"use client";

import { useTranslations } from "next-intl";
import { RequestData } from "@/src/lib/services/loading-requests/getRequestById";
import { MapPin } from "lucide-react";

interface RequestLocationSectionProps {
  request: RequestData;
}

export default function RequestLocationSection({
  request,
}: RequestLocationSectionProps) {
  const t = useTranslations("loadingRequestsPage.detailsPage.locationSection");

  console.log(request.location);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-[#101828] rounded-full" />
        <h3 className="font-bold text-lg text-[#101828]">{t("title")}</h3>
      </div>
      <div className="w-full bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-4 py-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#1D4ED8] flex-shrink-0" />
        <p className="text-sm text-[#1D4ED8] font-medium">
          {request.location ?? t("noLocation")}
        </p>
      </div>
    </div>
  );
}
