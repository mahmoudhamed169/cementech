"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface PhoneStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  onNext: () => void;
}

export default function PhoneStep({ phone, setPhone, onNext }: PhoneStepProps) {
  const t = useTranslations("loginPage.phoneStep");

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl text-[#37352F] text-start tracking-tight">
          {t("title")}
        </h1>
        <p className="text-[#9B9A97] text-start text-base leading-loose">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <Label className="text-start text-[#37352F] text-sm font-semibold">
            {t("phoneLabel")}
          </Label>
          <Input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="h-12 text-start text-base rounded-lg border-[#E9E9E7] bg-[#FAFAF9] focus:bg-white focus:border-[#2382E2] transition-all text-[#37352F] placeholder:text-[#C7C6C3] shadow-none"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          className="w-full h-12 bg-[#2382E2] hover:bg-[#1a6ec7] rounded-lg font-semibold text-base text-white transition-all duration-150 shadow-none"
          onClick={onNext}
          disabled={phone.length < 10}
        >
          {t("continueBtn")}
        </Button>
      </div>
    </div>
  );
}
