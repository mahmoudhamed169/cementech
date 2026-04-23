"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import StepOne from "./_steps/step-one";
import StepTwo from "./_steps/step-two";
import { Request } from "@/src/lib/types/requests/request";

interface ApproveRequestModalProps {
  request: Request;
  open: boolean;
  onClose: () => void;
  canApprove: boolean; // ✅
  canReject: boolean;  // ✅
}

export default function ApproveRequestModal({
  request,
  open,
  onClose,
  canApprove,
  canReject,
}: ApproveRequestModalProps) {
  const t = useTranslations("loadingRequestsPage.approveModal");
  const [step, setStep] = useState<1 | 2>(1);

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-2xl bg-white border-0">
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="font-bold text-xl text-[#101828]">{t("title")}</h2>
        </div>

        {step === 1 ? (
          <StepOne
            request={request}
            onApprove={() => setStep(2)}
            onReject={handleClose}
            canApprove={canApprove} // ✅
            canReject={canReject}   // ✅
          />
        ) : (
          <StepTwo request={request} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}