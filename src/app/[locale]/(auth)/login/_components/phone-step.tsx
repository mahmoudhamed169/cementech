"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useSendOtp } from "../../_hooks/use-send-otp";
import { toast } from "sonner";

interface PhoneStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  onNext: (transactionId: string) => void;
}

export default function PhoneStep({ phone, setPhone, onNext }: PhoneStepProps) {
  const t = useTranslations("loginPage.phoneStep");
  const { mutate: sendOtp, isPending } = useSendOtp();

  function handleContinue() {
    sendOtp(phone, {
      onSuccess: (data) => onNext(data.transactionId),
      onError: (error: Error) => toast.error(error.message),
    });
  }

  return (
    <div className="flex flex-col gap-11 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[2.25rem] text-[#37352F] text-start tracking-tight leading-tight">
          {t("title")}
        </h1>
        <p className="text-[#9B9A97] text-start text-[1.05rem] leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <Label className="text-start text-[#37352F] text-[0.95rem] font-semibold">
            {t("phoneLabel")}
          </Label>
          <Input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="h-12 text-start text-[1rem] rounded-lg border-[#E9E9E7] bg-[#FAFAF9] focus:bg-white focus:border-[#2382E2] transition-all text-[#37352F] placeholder:text-[#C7C6C3] shadow-none"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          className="w-full h-12 bg-[#2382E2] hover:bg-[#1a6ec7] rounded-lg font-semibold text-[1rem] text-white transition-all duration-150 shadow-none"
          onClick={handleContinue}
          disabled={phone.length < 10 || isPending}
        >
          {isPending ? "..." : t("continueBtn")}
        </Button>
      </div>
    </div>
  );
}
