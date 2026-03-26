"use client";

import { useTranslations } from "next-intl";
import { RequestData } from "@/src/lib/services/loading-requests/getRequestById";
import { Download, FileText } from "lucide-react";
import { Link } from "@/src/i18n/navigation";

interface RequestInfoSectionProps {
  request: RequestData;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-bold text-[#101828]">{label}</p>
      <div className="w-full bg-[#f9f9f9] border border-[#f9f9f9] rounded-xl px-4 py-2.5 min-h-10 flex items-center">
        <p className="text-sm text-[#6A7282]">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-5 bg-[#101828] rounded-full" />
      <h3 className="font-bold text-lg text-[#101828]">{title}</h3>
    </div>
  );
}

export default function RequestInfoSection({
  request,
}: RequestInfoSectionProps) {
  const t = useTranslations("loadingRequestsPage.detailsPage.infoSection");

  return (
    <div className="space-y-10">
      {/* معلومات الطلب */}
      <div className="space-y-6">
        <SectionTitle title={t("title")} />
        <div className="grid grid-cols-2 gap-3">
          <InfoItem label={t("requestCode")} value={`#${request.code}`} />
          <InfoItem label={t("driverName")} value={request.driver_name} />
          <InfoItem label={t("phone")} value={request.phone_number} />
          <InfoItem label={t("driverCode")} value={request.car_plates} />
          <InfoItem label={t("carPlates")} value={request.car_plates} />
          <InfoItem
            label={t("createdAt")}
            value={new Date(request.created_at).toLocaleString()}
          />
        </div>
      </div>

      {/* وثائق التحميل */}
      {(request.trip_certificate || request.laying_command) && (
        <div className="space-y-6">
          <SectionTitle title={t("documents")} />
          <div className="grid grid-cols-2 gap-3">
            {request.trip_certificate && (
              <Link
                href={request.trip_certificate}
                target="_blank"
                className="flex items-center justify-between gap-2 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#364153]" />
                  <span className="text-sm font-medium text-[#101828]">
                    {t("tripCertificate")}
                  </span>
                </div>
                <Download className="w-4 h-4 text-[#364153]" />
              </Link>
            )}
            {request.laying_command && (
              <Link
                href={request.laying_command}
                target="_blank"
                className="flex items-center justify-between gap-2 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#364153]" />
                  <span className="text-sm font-medium text-[#101828]">
                    {t("layingCommand")}
                  </span>
                </div>
                <Download className="w-4 h-4 text-[#364153]" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
