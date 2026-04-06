import { RequestDetails } from "@/src/lib/types/invoices/request-invoice-details";
import { InfoItem } from "../../_components/parties-information";

export default function RequestDetails({
  request,
}: {
  request: RequestDetails;
}) {
  return (
    <div className="space-y-2 flex-1">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل الطلب</h2>
      <div className="min-h-[240px] rounded-xl bg-gray-50 py-4 px-5">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="كود الطلب" value={`#${request.code}`} />
          <InfoItem label="الكمية" value={`${request.quantity} طن`} />
          <InfoItem label="حالة الطلب" value={request.request_status_ar} />
          <InfoItem
            label="نوع الطلب"
            value={
              request.request_type === "with_data"
                ? "بيانات كاملة"
                : request.request_type
            }
          />
          <InfoItem
            label="تاريخ الإنشاء"
            value={new Date(request.created_at).toLocaleDateString("ar-SA")}
          />
          <InfoItem
            label="تاريخ التحميل"
            value={
              request.loaded_at
                ? new Date(request.loaded_at).toLocaleDateString("ar-SA")
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
}
