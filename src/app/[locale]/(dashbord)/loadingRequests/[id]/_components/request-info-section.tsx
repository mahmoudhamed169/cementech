"use client";

import { useTranslations } from "next-intl";
import { RequestData } from "@/src/lib/services/loading-requests/getRequestById";
import { Download, FileText, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RequestInfoSectionProps {
  request: RequestData;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs text-[#6A7282]">{label}</p>
      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 min-h-10 flex items-center">
        <p className="text-sm font-medium text-[#101828]">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-5 bg-[#4F39F6] rounded-full" />
      <h3 className="font-bold text-base text-[#101828]">{title}</h3>
    </div>
  );
}

function isPdf(url: string) {
  return url.toLowerCase().includes(".pdf");
}

function DocumentItem({
  label,
  url,
  onPreview,
}: {
  label: string;
  url: string;
  onPreview: (url: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-[#364153]" />
        <span className="text-sm font-medium text-[#101828]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* معاينة */}
        <button
          onClick={() => onPreview(url)}
          className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Eye className="w-4 h-4 text-[#364153]" />
        </button>
        {/* تنزيل */}
      {/* تنزيل */}
<button
  onClick={() => window.open(url, "_blank")}
  className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
>
  <Download className="w-4 h-4 text-[#364153]" />
</button>
      </div>
    </div>
  );
}

export default function RequestInfoSection({
  request,
}: RequestInfoSectionProps) {
  const t = useTranslations("loadingRequestsPage.detailsPage.infoSection");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* معلومات السائق */}
      <div className="space-y-4">
        <SectionTitle title={t("driverInfo")} />
        <div className="grid grid-cols-3 gap-4">
          <InfoItem label={t("requestCode")} value={`#${request.code}`} />
          <InfoItem label={t("driverName")} value={request.driver_name} />
          <InfoItem label={t("phone")} value={request.phone_number} />
          <InfoItem label={t("carPlates")} value={request.car_plates} />
          <InfoItem
            label={t("createdAt")}
            value={new Date(request.created_at).toLocaleString()}
          />
        </div>
      </div>

      {/* معلومات الطلب */}
      <div className="space-y-4">
        <SectionTitle title={t("orderInfo")} />
        <div className="grid grid-cols-3 gap-4">
          <InfoItem label={t("productName")} value={request.product_name} />
          <InfoItem label={t("factoryName")} value={request.factory_name} />
          <InfoItem label={t("quantity")} value={request.quantity.toString()} />
        </div>
      </div>

      {/* وثائق التحميل */}
      {(request.trip_certificate || request.laying_command) && (
        <div className="space-y-4">
          <SectionTitle title={t("documents")} />
          <div className="grid grid-cols-2 gap-3">
            {request.trip_certificate && (
              <DocumentItem
                label={t("tripCertificate")}
                url={request.trip_certificate}
                onPreview={setPreviewUrl}
              />
            )}
            {request.laying_command && (
              <DocumentItem
                label={t("layingCommand")}
                url={request.laying_command}
                onPreview={setPreviewUrl}
              />
            )}
          </div>
        </div>
      )}

      {/* موديل المعاينة */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-3xl w-full bg-white border-0">
          <DialogHeader>
            <DialogTitle>{t("preview")}</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[70vh] flex items-center justify-center">
            {previewUrl && isPdf(previewUrl) ? (
              <iframe
                src={previewUrl}
                className="w-full h-full rounded-xl border border-[#E5E7EB]"
              />
            ) : (
              <img
                src={previewUrl ?? ""}
                alt="preview"
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}