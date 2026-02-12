import React from "react";

type Driver = {
  name: string;
  plateNumber: string;
  arrivalTime: string;
};

const drivers: Driver[] = [
  {
    name: "محمد حسين البنهاوي",
    plateNumber: "ن س ر - 1234",
    arrivalTime: "10-01-2026 - 11:24 صباحًا",
  },
  {
    name: "أحمد عبد الرحمن",
    plateNumber: "ر ك ب - 5678",
    arrivalTime: "10-01-2026 - 01:10 مساءً",
  },
  {
    name: "خالد محمود علي",
    plateNumber: "م ل د - 9012",
    arrivalTime: "11-01-2026 - 09:45 صباحًا",
  },
];

export default function DeliveryDetails() {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل السائقين</h2>

      <div className="grid grid-cols-3 gap-4">
        {drivers.map((driver, index) => (
          <div
            key={index}
            className="
              bg-[#F9FAFB] rounded-xl p-5
              flex flex-col justify-between
              space-y-6
            "
          >
            {/* Top Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-[#6B7280]">اسم السائق</p>
                <p className="font-medium text-[#0A0A0A] leading-snug">
                  {driver.name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-[#6B7280]">رقم اللوحات</p>
                <p className="font-medium text-[#0A0A0A]">
                  {driver.plateNumber}
                </p>
              </div>
            </div>

            {/* Arrival Time */}
            <div className="space-y-1">
              <p className="text-xs text-[#6B7280]">تاريخ ووقت الوصول</p>
              <p className="font-semibold text-[#0A0A0A]">
                {driver.arrivalTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
