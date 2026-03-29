"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RECIPIENT_OPTIONS } from "../_constants";
import { RecipientType } from "../_types";

interface RecipientSelectorProps {
  value: RecipientType;
  onChange: (value: RecipientType) => void;
}

export default function RecipientSelector({
  value,
  onChange,
}: RecipientSelectorProps) {
  const t = useTranslations("NotificationPage.sendModal");

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{t("sendTo")}</Label>
      <div className="grid grid-cols-2 gap-2">
        {RECIPIENT_OPTIONS.map(({ key, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-sm transition-all",
              value === key
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
            )}
          >
            <Icon className="h-5 w-5" />
            {t(`recipients.${key}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
