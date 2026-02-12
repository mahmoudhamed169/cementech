import React from "react";

// Reusable Info Item
export function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

// Reusable Card
function InfoCard({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h5 className="text-xl font-semibold text-gray-900">{title}</h5>
      <div className="min-w-[480px] min-h-[240px] rounded-xl bg-gray-50 py-4 px-5 flex flex-col justify-between">
        {children}
        {footer && (
          <div className="mt-4 pt-3 border-t flex justify-between text-sm">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function PartiesInformation() {
  return (
    <div className="flex gap-6">
      {/* Supplier */}
      <InfoCard
        title="تفاصيل المورد"
        footer={
          <>
            <InfoItem label="الرقم الضريبي" value="50070006000" />
            <InfoItem label="رقم التواصل " value="0500700060" />
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <InfoItem label="الاسم" value="شركة سيمينتك" />
          <InfoItem
            label="العنوان"
            value="الرياض - تقسيم زهدي - شارع عثمان بن عفان"
          />
        </div>
      </InfoCard>

      {/* Recipient */}
      <InfoCard
        title="تفاصيل المستلم"
        footer={
          <>
            <InfoItem label="الرقم الضريبي" value="50070006000" />
            <InfoItem label="رقم الجوال" value="0500700060" />
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="الاسم " value="محمد شهاب الدين" />
          <InfoItem label="اسم المؤسسة" value="الحمد للإنشاءات" />
          <InfoItem label="ID رقم" value="USR-120032" />
          <InfoItem
            label="العنوان"
            value="الرياض - تقسيم الولاء - شارع ابو بكر"
          />
        </div>
      </InfoCard>
    </div>
  );
}
