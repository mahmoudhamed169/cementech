"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomReportForm() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    console.log({ reportType, startDate, endDate });
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
      <h3 className="text-base font-bold text-gray-800">إنشاء تقرير مخصص</h3>

      <div className="flex items-end gap-4">
        {/* نوع التقرير */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm text-gray-500">نوع التقرير</label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white text-sm">
              <SelectValue placeholder="اختر نوع التقرير" />
            </SelectTrigger>
            <SelectContent className="bg-white border-0">
              <SelectItem value="revenue">تقرير الإيرادات</SelectItem>
              <SelectItem value="commission">تقرير العمولة</SelectItem>
              <SelectItem value="bonuses">تقرير المكافآت</SelectItem>
              <SelectItem value="all">تقرير شامل</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* تاريخ البداية */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm text-gray-500">تاريخ البداية</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* تاريخ النهاية */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm text-gray-500">تاريخ النهاية</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* زرار التحميل */}
        <Button
          onClick={handleDownload}
          disabled={!reportType || !startDate || !endDate}
          className="h-12 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2 whitespace-nowrap"
        >
          <Download size={16} />
          إنشاء و تحميل التقرير
        </Button>
      </div>
    </div>
  );
}
