import React from "react";

interface StatItemProps {
  title: string;
  value: number | string;
  bgColor: string;
  icon: React.ReactNode;
  iconColor: string;
  currency?: React.ReactNode;
}

export default function StatItem({
  title,
  value,
  bgColor,
  icon,
  iconColor,
  currency,
}: StatItemProps) {
  return (
    <div
      className={`min-h-24 p-4 rounded-xl flex flex-col justify-center gap-4 ${bgColor}`}
    >
      <h6 className="flex items-center gap-2 text-sm text-[#4A5565]">
        <span className={`${iconColor} flex items-center`}>{icon}</span>
        <span>{title}</span>
      </h6>

      <h4 className="font-bold text-2xl flex gap-2 items-center">
        {value} {currency && currency}
      </h4>
    </div>
  );
}
