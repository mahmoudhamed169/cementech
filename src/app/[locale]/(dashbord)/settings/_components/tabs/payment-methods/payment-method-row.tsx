"use client";

import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

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
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
      <Switch checked={enabled} onCheckedChange={onToggle} />
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span>{label}</span>
        <Icon size={16} className="text-gray-400" />
      </div>
    </div>
  );
}
