import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type WarningType = "urgent" | "warning" | "info";

const warningStyles: Record<
  WarningType,
  {
    bg: string;
    border: string;
    icon: string;
  }
> = {
  urgent: {
    bg: "bg-[#FEF2F2]",
    border: "border-s-[#FB2C36]",
    icon: "text-[#FB2C36]",
  },
  warning: {
    bg: "bg-[#FEFCE8]",
    border: "border-s-[#F0B100]",
    icon: "text-[#F0B100]",
  },
  info: {
    bg: "bg-[#EFF6FF]",
    border: "border-s-[#2B7FFF]",
    icon: "text-[#2B7FFF]",
  },
};

interface WarningItemProps {
  type: WarningType;
  title: string;
  time: string;
}

export default function WarningItem({ type, title, time }: WarningItemProps) {
  const styles = warningStyles[type];

  return (
    <div
      className={cn(
        "min-h-18 flex items-start p-4 gap-3 border-s-4 rounded-xl",
        styles.bg,
        styles.border
      )}
    >
      <CircleAlert className={cn("mt-0.5", styles.icon)} />

      <div>
        <h5 className="text-sm font-medium text-[#111827]">
          {title}
        </h5>
        <span className="text-xs text-[#6A7282]">{time}</span>
      </div>
    </div>
  );
}
