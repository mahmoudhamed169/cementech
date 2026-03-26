"use client";

import { useTranslations } from "next-intl";
import { Request } from "@/src/lib/types/requests/request";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle, Upload, FileText } from "lucide-react";
import { Check } from "lucide-react";

interface StepTwoProps {
  request: Request;
  onClose: () => void;
}

export default function StepTwo({ request, onClose }: StepTwoProps) {
  const t = useTranslations("loadingRequestsPage.approveModal.stepTwo");
  const [tripCertificate, setTripCertificate] = useState<File | null>(null);
  const [layingCommand, setLayingCommand] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");

  const handleSubmit = async () => {
    // هنا هنعمل الـ API call
  };

  return (
    <div className="p-6 space-y-6">
      {/* رسالة تأكيد */}
      <div className="bg-[#F9FAFB] rounded-2xl px-4 py-3 text-sm text-[#364153] text-center">
        {t("confirmMessage")}
      </div>

      {/* موقع المصنع */}
      <div className="space-y-2">
        <h3 className="font-bold text-base text-[#101828]">
          {t("locationTitle")}
        </h3>
        <div className="w-full h-48 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl overflow-hidden relative flex items-center justify-center">
          <p className="text-sm text-[#6A7282]">{t("mapPlaceholder")}</p>
        </div>
        <div className="w-full bg-[#f9f9f9] border border-[#E5E7EB] rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="text-sm text-[#6A7282]">
            {location || t("selectLocation")}
          </span>
        </div>
      </div>

      {/* المستندات المطلوبة */}
      <div className="space-y-3">
        <h3 className="font-bold text-base text-[#101828]">
          {t("documentsTitle")}
        </h3>

        {/* شهادة الرحلة */}
        <label
          className={`flex items-center justify-between gap-2 p-4 rounded-2xl border cursor-pointer transition-colors ${tripCertificate ? "bg-green-50 border-green-400" : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-gray-100"}`}
        >
          <div className="flex items-center gap-2">
            {tripCertificate ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <FileText className="w-5 h-5 text-[#364153]" />
            )}
            <span className="text-sm font-medium text-[#101828]">
              {t("tripCertificate")}
            </span>
          </div>
          <Upload className="w-4 h-4 text-[#364153]" />
          <input
            type="file"
            className="hidden"
            onChange={(e) => setTripCertificate(e.target.files?.[0] ?? null)}
          />
        </label>

        {/* امر التنزيل */}
        <label
          className={`flex items-center justify-between gap-2 p-4 rounded-2xl border cursor-pointer transition-colors ${layingCommand ? "bg-green-50 border-green-400" : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-gray-100"}`}
        >
          <div className="flex items-center gap-2">
            {layingCommand ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <FileText className="w-5 h-5 text-[#364153]" />
            )}
            <span className="text-sm font-medium text-[#101828]">
              {t("layingCommand")}
            </span>
          </div>
          <Upload className="w-4 h-4 text-[#364153]" />
          <input
            type="file"
            className="hidden"
            onChange={(e) => setLayingCommand(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {/* الأزرار */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleSubmit}
          className="flex-1 h-12 bg-[#155DFC] hover:bg-[#1249d4] text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          {t("submit")}
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 h-12 rounded-2xl font-semibold"
        >
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}
