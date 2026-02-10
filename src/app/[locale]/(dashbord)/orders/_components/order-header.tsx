"use client";

import { Switch } from "@/components/ui/switch";

export default function OrderHeader() {
  return (
    <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
      <div className="space-x-2">
        <h2 className="text-2xl font-bold">ادارة الطلبات</h2>
        <p>مراقبة وإدارة جميع طلبات التوصيل في الوقت الفعلي</p>
      </div>

      <div className="flex items-center gap-3">
        <h6>تخصيص الطلبات للسائقين تلقائياً</h6>

        <Switch />

        <h6>مفعل</h6>
      </div>
    </div>
  );
}
