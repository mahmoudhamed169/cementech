"use client";

import { Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({ currentStep, totalSteps }: Props) {
  const t = useTranslations("settingsPage.tabs.delivery.modal.steps");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const steps = [
    { number: 1, label: t("location") },
    { number: 2, label: t("settings") },
    { number: 3, label: t("review") },
  ];

  const orderedSteps = isRTL ? [...steps].reverse() : steps;

  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {orderedSteps.map((step, idx) => {
        // الـ connector يتلون لو الـ step التالي في الترتيب الأصلي completed
        const nextStep = isRTL ? orderedSteps[idx + 1] : orderedSteps[idx + 1];
        const isConnectorDone = nextStep ? currentStep > nextStep.number : false;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${
                    currentStep === step.number
                      ? "bg-blue-600 text-white"
                      : currentStep > step.number
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
              >
                {currentStep > step.number ? <Check size={14} /> : step.number}
              </div>
              <span
                className={`text-xs ${
                  currentStep === step.number
                    ? "text-blue-600 font-medium"
                    : currentStep > step.number
                      ? "text-green-500"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < totalSteps - 1 && (
              <div
                className={`h-0.5 w-16 mb-5 transition-all ${
                  isConnectorDone ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}