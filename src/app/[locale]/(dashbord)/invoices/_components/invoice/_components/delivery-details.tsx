import { Shipment } from "@/src/lib/types/invoices/invoice-details";
import React from "react";

export default function DeliveryDetails({
  shipments,
}: {
  shipments: Shipment[];
}) {
  return (
    <div className="space-y-5 print:w-full print:break-inside-avoid">
      {/* Title */}
      <h2 className="font-semibold text-[#0A0A0A] text-xl print:break-inside-avoid">
        تفاصيل السائقين
      </h2>

      {/* Drivers list */}
      <div className="grid grid-cols-3 gap-4 print:grid-cols-2">
        {shipments.length === 0 && (
          <p className="text-sm text-gray-400">لا يوجد سائقين</p>
        )}
        {shipments.map((driver) => (
          <div
            key={driver.id}
            className="bg-[#F9FAFB] rounded-xl p-5 flex flex-col justify-between space-y-6 print:break-inside-avoid"
          >
            {/* Top Info */}
            <div className="grid grid-cols-2 gap-6 print:grid-cols-1">
              <div className="space-y-1">
                <p className="text-xs text-[#6B7280]">اسم السائق</p>
                <p className="font-medium text-[#0A0A0A] leading-snug">
                  {driver.name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-[#6B7280]">رقم اللوحات</p>
                <p className="font-medium text-[#0A0A0A]">
                  {driver.plate_number}
                </p>
              </div>
            </div>

            {/* Arrival Time */}
            <div className="space-y-1">
              <p className="text-xs text-[#6B7280]">تاريخ ووقت الوصول</p>
              <p className="font-semibold text-[#0A0A0A]">
                {driver.arrival_time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
