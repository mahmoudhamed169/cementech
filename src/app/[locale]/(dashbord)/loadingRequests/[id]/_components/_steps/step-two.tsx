"use client";

import { useTranslations } from "next-intl";
import { Request } from "@/src/lib/types/requests/request";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle, Upload, FileText, Check } from "lucide-react";
import { useAcceptRequest } from "../../../_hooks/use-accept-request";

interface StepTwoProps {
  request: Request;
  onClose: () => void;
}

export default function StepTwo({ request, onClose }: StepTwoProps) {
  const t = useTranslations("loadingRequestsPage.approveModal.stepTwo");
  const [tripCertificate, setTripCertificate] = useState<File | null>(null);
  const [layingCommand, setLayingCommand] = useState<File | null>(null);

  const { mutate, isPending } = useAcceptRequest(request.id, onClose);

  const requestType = request.request_type;

  const handleSubmit = () => {
    mutate({
      request_type: requestType,
      ...(requestType === "with_data" && {
        trip_certificate: tripCertificate ?? undefined,
        laying_command: layingCommand ?? undefined,
      }),
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* رسالة تأكيد */}
      <div className="bg-[#F9FAFB] rounded-2xl px-4 py-3 text-sm text-[#364153] text-center">
        {t("confirmMessage")}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-base text-[#101828]">
          {t("locationTitle")}
        </h3>

        {/* Factory Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#6A7282]">
            {t("factoryName")}
          </label>
          <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3">
            <span className="text-sm text-[#101828]">
              {request.factory_name || "—"}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#6A7282]">
            {t("productName")}
          </label>
          <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3">
            <span className="text-sm text-[#101828]">
              {request.product_name || "—"}
            </span>
          </div>
        </div>

        {/* Lat & Long */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#6A7282]">
            {t("locationCoords")}
          </label>
          <div className="flex gap-2">
            <div className="w-1/2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3">
              <span className="text-xs text-[#6A7282] block mb-0.5">
                {t("latitude")}
              </span>
              <span className="text-sm text-[#101828]">
                {request.lat ?? "—"}
              </span>
            </div>
            <div className="w-1/2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3">
              <span className="text-xs text-[#6A7282] block mb-0.5">
                {t("longitude")}
              </span>
              <span className="text-sm text-[#101828]">
                {request.lng ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* المستندات المطلوبة - تظهر فقط لو with_data */}
      {requestType === "with_data" && (
        <div className="space-y-3">
          <h3 className="font-bold text-base text-[#101828]">
            {t("documentsTitle")}
          </h3>

          {/* شهادة الرحلة */}
          <label
            className={`flex items-center justify-between gap-2 p-4 rounded-2xl border cursor-pointer transition-colors ${
              tripCertificate
                ? "bg-green-50 border-green-400"
                : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-gray-100"
            }`}
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
            className={`flex items-center justify-between gap-2 p-4 rounded-2xl border cursor-pointer transition-colors ${
              layingCommand
                ? "bg-green-50 border-green-400"
                : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-gray-100"
            }`}
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
      )}

      {/* الأزرار */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex-1 h-12 bg-[#155DFC] hover:bg-[#1249d4] text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          {isPending ? t("submitting") : t("submit")}
        </Button>
        <Button
          onClick={onClose}
          disabled={isPending}
          variant="outline"
          className="flex-1 h-12 rounded-2xl font-semibold"
        >
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}
