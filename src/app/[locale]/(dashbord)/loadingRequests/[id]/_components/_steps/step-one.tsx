"use client";

import { useTranslations } from "next-intl";
import { Request } from "@/src/lib/types/requests/request";
import { LoadingRequestStatusBadge } from "@/src/app/[locale]/(dashbord)/_components/loading-qequest-status-badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRejectRequest } from "../../../_hooks/use-reject-request";

interface StepOneProps {
  request: Request;
  onApprove: () => void;
  onReject: () => void;
  canApprove: boolean; // ✅ POST
  canReject: boolean; // ✅ PATCH
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

export default function StepOne({
  request,
  onApprove,
  onReject,
  canApprove,
  canReject,
}: StepOneProps) {
  const t = useTranslations("loadingRequestsPage.approveModal.stepOne");
  const { rejectRequest, isPending } = useRejectRequest();

  const handleReject = () => {
    rejectRequest(request.id, {
      onSuccess: (data) => {
        if (data.success) onReject();
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* حالة الطلب */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
        <span className="text-sm font-medium text-[#101828]">
          {t("status")}
        </span>
        <LoadingRequestStatusBadge status={request.request_status} />
      </div>

      {/* معلومات الطلب */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-[#101828]">{t("infoTitle")}</h3>
        <div className="grid grid-cols-2 gap-3">
          <InfoItem label={t("requestCode")} value={`#${request.code}`} />
          <InfoItem label={t("phone")} value={request.phone_number} />
          <InfoItem label={t("driverName")} value={request.driver_name} />
          <InfoItem label={t("driverCode")} value={request.car_plates} />
          <InfoItem label={"المصنع"} value={request.factory_name} />
          <InfoItem label={"المنتج"} value={request.product_name} />
          <InfoItem label={"الكمية"} value={request.quantity} />
          <InfoItem label={t("carPlates")} value={request.car_plates} />
          <InfoItem
            label={t("createdAt")}
            value={new Date(request.created_at).toLocaleString()}
          />
        </div>
      </div>

      {/* الأزرار — بتظهر حسب الصلاحية */}
      {(canApprove || canReject) && (
        <div className="flex items-center gap-3 pt-2">
          {canApprove && (
            <Button
              onClick={onApprove}
              className="flex-1 h-12 bg-[#155DFC] hover:bg-[#1249d4] text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              {t("approve")}
            </Button>
          )}
          {canReject && (
            <Button
              onClick={handleReject}
              disabled={isPending}
              className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              {isPending ? t("rejecting") : t("reject")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
