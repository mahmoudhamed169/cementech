import { Progress } from "@/components/ui/progress";
import StatsProgress from "./stats-progress";

export default function DriversStatus() {
  return (
    <div className="w-lg p-6  rounded-xl min-h-85 bg-white border border-[#E5E7EB]">
      <h2 className="font-bold text-lg text-[#101828] mb-4">حالة السائقين</h2>

      <div className="flex flex-col gap-6 border-b pb-8 border-[#E5E7EB]">
        <StatsProgress label="متاح" value={156} max={342} type="AVAILABLE" />

        <StatsProgress
          label="في طلبات توصيل"
          value={89}
          max={342}
          type="IN_DELIVERY"
        />

        <StatsProgress
          label="غير متاح"
          value={180}
          max={342}
          type="UNAVAILABLE"
        />
      </div>
      <div className="mt-6">
        <h6 className="text-[#4A5565] ">اجمالي السائقين</h6>
        <h5 className="font-bold text-2xl text-[#101828]">342</h5>
      </div>
    </div>
  );
}
