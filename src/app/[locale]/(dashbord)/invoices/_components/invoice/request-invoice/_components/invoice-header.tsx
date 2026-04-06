import Logo from "@/src/components/shared/logo";

export default function InvoiceHeader({
  invoiceCode,
  requestCode,
}: {
  invoiceCode: string;
  requestCode: string;
}) {
  return (
    <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4 w-full min-w-0 flex-1">
      <div>
        <h2 className="font-bold text-[#0A0A0A] text-3xl">
          فاتورة طلب التحميل
        </h2>
        <h6 className="text-sm text-gray-500 mt-1">
          رقم الفاتورة: {invoiceCode}
        </h6>
        <h6 className="text-sm text-gray-500">رقم الطلب: {requestCode}</h6>
      </div>
      <div>
        <Logo type="dark" />
      </div>
    </div>
  );
}
