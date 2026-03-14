"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PricingFieldProps = {
  label: string;
  unit: string;
  value: number;
  onChange: (value: string) => void;
};

export default function PricingField({
  label,
  unit,
  value,
  onChange,
}: PricingFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}
        <span className="text-gray-400">({unit})</span>
      </Label>
      <Input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}