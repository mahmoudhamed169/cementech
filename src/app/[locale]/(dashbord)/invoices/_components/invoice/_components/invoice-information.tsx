import Logo from "@/src/components/shared/logo";

export default function InvoiceInformation({
  invoiceNumber,
}: {
  invoiceNumber: any;
}) {
  return (
    <div className="flex justify-between  items-center border-b border-[#E5E7EB]">
      <div>
        <h2 className="font-bold text-[#0A0A0A] text-3xl ">فاتورة طلب</h2>
        <h6>رقم الطلب: {invoiceNumber}</h6>
      </div>
      <div>
        <Logo type="dark" />
      </div>
    </div>
  );
}
