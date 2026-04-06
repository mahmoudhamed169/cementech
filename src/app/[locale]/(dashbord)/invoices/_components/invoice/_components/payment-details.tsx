import { Payment } from "@/src/lib/types/invoices/invoice-details";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";

export default function PaymentDetails({ payment }: { payment: Payment }) {
  const { summary } = payment;

  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل الدفع</h2>
      <div className="bg-[#29303D] rounded-xl p-4 w-108 min-h-36 print:w-full">
        <div className="grid grid-cols-2 gap-4 text-[#A2A2A2]">
          <div className="flex flex-col gap-1 text-sm">
            <span>إجمالي المبلغ</span>
            <span className="font-medium flex items-center gap-0.5 text-white">
              {summary.grand_total}{" "}
              <CurrencyIcon className="stroke-white" fill="#ffff" />
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span>المبلغ المدفوع</span>
            <span className="font-medium flex items-center gap-0.5 text-[#00A63E]">
              {summary.total_paid}{" "}
              <CurrencyIcon className="stroke-[#00A63E]" fill="#00A63E" />
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span>طريقة الدفع</span>
            <span className="font-medium flex items-center gap-0.5 text-white">
              {summary.payment_type}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span>المبلغ المتبقي</span>
            <span className="font-medium flex items-center gap-0.5 text-white">
              {summary.balance_due}{" "}
              <CurrencyIcon className="stroke-white" fill="#ffff" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
