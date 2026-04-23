"use client";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { usePermissionsStore } from "@/src/store/permissionsStore";

type PaymentMethodRowProps = {
  label: string;
  icon: LucideIcon;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function PaymentMethodRow({
  label,
  icon: Icon,
  enabled,
  onToggle,
}: PaymentMethodRowProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const can = usePermissionsStore((s) => s.can);
  const canEdit = can("setting_permission", "PATCH"); //       

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon size={16} className="text-gray-400" />
        <span>{label}</span>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        disabled={!canEdit} // ← مش هيقدر يضغط
      />
    </div>
  );
}
