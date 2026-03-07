"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface OtpStepProps {
  phone: string;
  onBack: () => void;
}

export default function OtpStep({ phone, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const t = useTranslations("loginPage.otpStep");

  return (
    <div className="flex flex-col gap-10 w-full">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#9B9A97] hover:text-[#37352F] transition-colors w-fit"
      >
        <ArrowRight className="w-4 h-4" />
        {t("back")}
      </button>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl text-[#37352F] text-start tracking-tight">
          {t("title")}
        </h1>
        <p className="text-[#9B9A97] text-start text-base leading-loose">
          {t("subtitle")}{" "}
          <span className="text-[#37352F] font-semibold" dir="ltr">
            {phone}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <InputOTP maxLength={4} value={otp} onChange={setOtp} dir="ltr">
          <InputOTPGroup className="gap-4">
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-16 h-16 text-2xl font-semibold rounded-lg border-[#E9E9E7] bg-[#FAFAF9] text-[#37352F] shadow-none"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <button className="text-sm text-[#9B9A97] hover:text-[#2382E2] transition-colors">
          {t("resend")}{" "}
          <span className="text-[#2382E2] font-medium">{t("resendBtn")}</span>
        </button>
      </div>

      <Button
        className="w-full h-12 bg-[#2382E2] hover:bg-[#1a6ec7] rounded-lg font-semibold text-base text-white transition-all duration-150 shadow-none"
        disabled={otp.length < 4}
      >
        {t("confirmBtn")}
      </Button>
    </div>
  );
}
