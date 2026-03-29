"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OtpStepProps {
  phone: string;
  transactionId: string;
  onBack: () => void;
}

export default function OtpStep({
  phone,
  transactionId,
  onBack,
}: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("loginPage.otpStep");
  const tCommon = useTranslations("common.toast");
  const router = useRouter();
  const locale = useLocale();

  async function handleConfirm() {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        otp,
        transactionId,
        redirect: false,
      });

      if (result?.error) {
        toast.error(
          result.error === "CredentialsSignin"
            ? tCommon("loginError")
            : result.error,
        );
        return;
      }

      toast.success(tCommon("loginSuccess"));
      router.push(`/${locale}`);
    } catch {
      toast.error(tCommon("loginError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-11 w-full">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[0.95rem] text-[#9B9A97] hover:text-[#37352F] transition-colors w-fit"
      >
        <ArrowRight className="w-4 h-4" />
        {t("back")}
      </button>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[2.25rem] text-[#37352F] text-start tracking-tight leading-tight">
          {t("title")}
        </h1>
        <p className="text-[#9B9A97] text-start text-[1.05rem] leading-relaxed">
          {t("subtitle")}{" "}
          <span className="text-[#37352F] font-semibold" dir="ltr">
            {phone}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp} dir="ltr">
          <InputOTPGroup className="gap-2.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-12 h-12 text-xl font-semibold rounded-lg border-[#E9E9E7] bg-[#FAFAF9] text-[#37352F] shadow-none"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <button className="text-[0.95rem] text-[#9B9A97] hover:text-[#2382E2] transition-colors">
          {t("resend")}{" "}
          <span className="text-[#2382E2] font-medium">{t("resendBtn")}</span>
        </button>
      </div>

      <Button
        className="w-full h-12 bg-[#2382E2] hover:bg-[#1a6ec7] rounded-lg font-semibold text-[1rem] text-white transition-all duration-150 shadow-none"
        disabled={otp.length < 6 || loading}
        onClick={handleConfirm}
      >
        {loading ? "..." : t("confirmBtn")}
      </Button>
    </div>
  );
}
