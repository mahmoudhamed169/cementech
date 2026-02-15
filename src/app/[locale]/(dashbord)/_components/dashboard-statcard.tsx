import React from "react";

interface DashboardStatCardProps {
  title: string;
  value: number;
  valueColor: string;
}

export default function DashboardStatCard({
  title,
  value,
  valueColor,
}: DashboardStatCardProps) {
  return (
    <div className="h-32 bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between">
      <h4 className="text-sm text-[#4A5565]">{title}</h4>
      <h5 className={`font-bold text-2xl ${valueColor}`}>{value}</h5>
    </div>
  );
}
