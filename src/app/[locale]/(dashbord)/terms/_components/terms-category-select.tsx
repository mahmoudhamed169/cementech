"use client";

import { useTranslations } from "next-intl";
import { TermsTarget } from "../_types/terms.types";
import { Tags } from "lucide-react";

interface TermsCategorySelectProps {
  activeTarget: TermsTarget;
  onChange: (target: TermsTarget) => void;
}

const categories: { value: TermsTarget; key: string }[] = [
  { value: "customer", key: "customers" },
  { value: "driver", key: "drivers" },
];

export default function TermsCategorySelect({
  activeTarget,
  onChange,
}: TermsCategorySelectProps) {
  const t = useTranslations("termsPage.category");

  return (
    <div
      style={{ height: "208.56px" }}
      className="border border-gray-300 rounded-xl p-4 space-y-3 bg-white"
    >
      <div className="flex items-center gap-2">
        <Tags size={20} className=" stroke-[#1F2937]" />
        <span className="text-sm font-semibold">{t("title")}</span>
      </div>
      <div className="space-y-3 mt-5">
        {categories.map(({ value, key }) => {
          const isActive = activeTarget === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              style={{ height: "58.28px" }}
              className={`w-full flex items-center justify-between rounded-lg px-4 border transition-all ${
                isActive
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-200 hover:border-green-500/50"
              }`}
            >
              <span
                className={`text-sm font-medium ${isActive ? "text-green-600" : ""}`}
              >
                {t(key)}
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? "border-green-500" : "border-muted-foreground"
                }`}
              >
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
