import { CurrencyIcon } from "@/src/components/shared/currency-icon";

export default function PaymentDetails() {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل الدفع</h2>
      <div className="bg-[#29303D] rounded-xl p-4 w-108 min-h-36">
        <div className="grid grid-cols-2 gap-4 text-[#A2A2A2]">
          <div className="flex flex-col gap-1 text-sm">
            <span className="">اجمالي المبلغ</span>
            <span className="font-medium  flex items-center gap-0.5 text-white">
              178000 <CurrencyIcon className=" stroke-white" fill="#ffff" />
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span className="">اجمالي المبلغ</span>
            <span className="font-medium  flex items-center gap-0.5 text-[#00A63E]">
              178000{" "}
              <CurrencyIcon className=" stroke-[#00A63E]" fill="#00A63E" />
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span className="">طريقة الدفع</span>
            <span className="font-medium  flex items-center gap-0.5 text-white">
              بطاقة ائتمان
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span className=""> رقم البطاقة</span>
            <span className="font-medium  flex items-center gap-0.5 text-white">
              1234 **** **** 3456
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
