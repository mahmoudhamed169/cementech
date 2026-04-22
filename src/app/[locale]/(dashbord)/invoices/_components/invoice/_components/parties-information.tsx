// parties-information.tsx

import {
  Factory,
  RecipientDetails,
} from "@/src/lib/types/invoices/invoice-details";
import React from "react";

export function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

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
    <div className="flex-1 space-y-2">
      <h5 className="text-xl font-semibold text-gray-900">{title}</h5>
      <div className="min-h-[240px] rounded-xl bg-gray-50 py-4 px-5 flex flex-col justify-between">
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

export default function PartiesInformation({
  recipient,
  factory,
}: {
  recipient: RecipientDetails;
  factory: Factory;
}) {
  return (
    // ✅ print:flex-row يضمن إنهم جنب بعض في الطباعة
    <div className="flex flex-row gap-6 w-full print:flex-row print:gap-4">
      {/* Supplier */}
      <InfoCard
        title="تفاصيل المورد"
        footer={
          <InfoItem label="رقم التواصل" value={factory.contact_number} />
        }
      >
        <div className="flex flex-col gap-3">
          <InfoItem label="الاسم" value={factory.name} />
          <InfoItem label="العنوان" value={factory.address} />
        </div>
      </InfoCard>

      {/* Recipient */}
      <InfoCard
        title="تفاصيل المستلم"
        footer={
          <>
            <InfoItem
              label="الرقم الضريبي"
              value={recipient.tax_number ?? "-"}
            />
            <InfoItem label="رقم الجوال" value={recipient.phone ?? "-"} />
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="الاسم" value={recipient.customer_name ?? "-"} />
          <InfoItem label="اسم المؤسسة" value={recipient.company_name ?? "-"} />
        </div>
      </InfoCard>
    </div>
  );
}