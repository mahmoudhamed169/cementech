import { Progress } from "@/components/ui/progress";

type StatsProgressProps = {
  label: string;
  value: number;
  max?: number;
  type: "AVAILABLE" | "IN_DELIVERY" | "UNAVAILABLE";
};

export default function StatsProgress({
  label,
  value,
  max = 100,
  type,
}: StatsProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const progressColor = {
    AVAILABLE: "[&>div]:bg-[#00C950]", // متاح
    IN_DELIVERY: "[&>div]:bg-[#2B7FFF]", // في طلبات توصيل
    UNAVAILABLE: "[&>div]:bg-[#99A1AF]", // غير متاح
  }[type];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-[#4A5565]">{label}</p>
        <h6 className="font-bold text-[#101828]">{value}</h6>
      </div>

      <Progress
        value={percentage}
        className={`w-full h-2 bg-zinc-200 ${progressColor}`}
      />
    </div>
  );
}
