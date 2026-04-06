import { RequestInvoiceDriver } from "@/src/lib/types/invoices/request-invoice-details";
import { InfoItem } from "../../_components/parties-information";

export default function DriverDetails({
  driver,
}: {
  driver: RequestInvoiceDriver;
}) {
  return (
    <div className="space-y-2 flex-1">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل السائق</h2>
      <div className="min-h-[240px] rounded-xl bg-gray-50 py-4 px-5 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
              {driver.driver_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-medium text-[#0A0A0A]">{driver.driver_name}</p>
              <p className="text-sm text-gray-500">{driver.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="نوع السيارة" value={driver.car_type} />
            <InfoItem
              label="الطاقة الاستيعابية"
              value={`${driver.car_hold_capacity} طن`}
            />
            <InfoItem label="رقم اللوحة" value={driver.car_plate_number} />
            <InfoItem label="حروف اللوحة" value={driver.car_plate_character} />
            <InfoItem label="موقع الإقامة" value={driver.residence_location} />
            <InfoItem
              label="نوع التوظيف"
              value={driver.employment_type === "internal" ? "داخلي" : "خارجي"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
