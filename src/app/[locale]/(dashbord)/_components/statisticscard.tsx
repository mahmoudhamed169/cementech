import { ReactNode } from "react";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface StatisticsCardProps {
  icon: ReactNode; // the icon element
  iconBg: string; // background color of the icon container
  percentage: string; // percentage text
  trending?: "up" | "down"; // trending arrow
  title: string; // small title
  value: string | number; // main number
}

export default function StatisticsCard({
  icon,
  iconBg,
  percentage,
  trending = "up",
  title,
  value,
}: StatisticsCardProps) {
  // Decide color based on trending
  const percentageColor = trending === "up" ? "#00A63E" : "#FF6B6B"; // green or red

  return (
    <div
      className="bg-white p-4 rounded-3xl shadow-sm min-h-42.5 px-6 pt-6 flex flex-col gap-4 border border-gray-200
        transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex justify-between items-center">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <div
          className="flex gap-1.5 items-center"
          style={{ color: percentageColor }}
        >
          <h5>{percentage}</h5>
          {trending === "up" ? <TrendingUp /> : <TrendingDown />}
        </div>
      </div>
      <h6 className="text-[#4A5565]">{title}</h6>
      <h4 className="font-bold text-xl text-[#101828]">{value}</h4>
    </div>
  );
}
