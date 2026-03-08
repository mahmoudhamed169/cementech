"use client";
import { useState } from "react";
import PhoneStep from "./phone-step";
import OtpStep from "./otp-step";
import LanguageSwitcher from "@/src/components/shared/language-switcher";
import { useTranslations } from "next-intl";

type Step = "phone" | "otp";

export default function LoginForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const t = useTranslations("loginPage.footer");

  return (
    <div className="relative flex flex-col h-full w-full max-w-[480px] mx-auto px-6">
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
        <LanguageSwitcher />
        <div className="flex gap-2">
          <div
            className={`h-1.5 w-10 rounded-full transition-all duration-300 ${step === "phone" ? "bg-[#2382E2]" : "bg-[#E9E9E7]"}`}
          />
          <div
            className={`h-1.5 w-10 rounded-full transition-all duration-300 ${step === "otp" ? "bg-[#2382E2]" : "bg-[#E9E9E7]"}`}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-16 mt-6">
        {step === "phone" ? (
          <PhoneStep
            phone={phone}
            setPhone={setPhone}
            onNext={(txId) => {
              setTransactionId(txId);
              setStep("otp");
            }}
          />
        ) : (
          <OtpStep
            phone={phone}
            transactionId={transactionId}
            onBack={() => setStep("phone")}
          />
        )}
      </div>

      <div className="pb-6 flex flex-col items-center gap-1.5 text-center">
        <div className="w-full h-px bg-[#F1F1EF] mb-4" />
        <div className="flex gap-1.5 items-center text-sm text-[#9B9A97]">
          <span>{t("problem")}</span>
          <a href="#" className="text-[#2382E2] hover:underline font-medium">
            {t("support")}
          </a>
        </div>
        <p className="text-xs text-[#C7C6C3]">{t("rights")}</p>
      </div>
    </div>
  );
}
