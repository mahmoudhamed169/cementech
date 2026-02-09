import { cn } from "@/lib/utils";
import React from "react";

type InfoCardProps = {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode; // أيقونة اختيارية
};

export function InfoCard({ label, value, icon }: InfoCardProps) {
  return (
    <div className="w-full min-h-21 bg-[#F9FAFB] rounded-xl p-4 flex flex-col gap-1.5">
      <h6 className="text-[#4A5565] flex items-center gap-1">{label}</h6>
      <h2
        className={`text-xl font-bold text-[#101828] flex items-center gap-1`}
      >
        {value}
        {icon && <span>{icon}</span>}
      </h2>
    </div>
  );
}
