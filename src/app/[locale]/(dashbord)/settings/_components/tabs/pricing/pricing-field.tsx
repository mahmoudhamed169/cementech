"use client";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PricingFieldProps = {
  label: string;
  unit: string;
  registration: UseFormRegisterReturn;
  disabled?: boolean; // ← add
};

export default function PricingField({
  label,
  unit,
  registration,
  disabled, // ← add
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
        disabled={disabled} // ← add
        className={
          disabled ? "bg-gray-50 cursor-not-allowed text-gray-400" : ""
        }
        {...registration}
      />
    </div>
  );
}
