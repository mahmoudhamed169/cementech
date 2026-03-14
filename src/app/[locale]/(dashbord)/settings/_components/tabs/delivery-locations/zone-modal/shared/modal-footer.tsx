"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  step: number;
  totalSteps: number;
  isStepValid: boolean;
  isEdit: boolean;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export default function ModalFooter({
  step,
  totalSteps,
  isStepValid,
  isEdit,
  onNext,
  onBack,
  onCancel,
  onSave,
}: Props) {
  const t = useTranslations("settingsPage.tabs.delivery.modal");
  const isLastStep = step === totalSteps;
  const isFirstStep = step === 1;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <button
        onClick={onCancel}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        {t("cancel")}
      </button>

      <div className="flex items-center gap-2">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack} className="gap-1">
            <ChevronRight size={16} />
            {t("back")}
          </Button>
        )}

        {isLastStep ? (
          <Button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
          >
            {isEdit ? t("update") : t("save")}
            <ChevronLeft size={16} />
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!isStepValid}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
          >
            {t("next")}
            <ChevronLeft size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
