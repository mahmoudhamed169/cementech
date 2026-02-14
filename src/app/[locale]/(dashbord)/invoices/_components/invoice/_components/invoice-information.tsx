import Logo from "@/src/components/shared/logo";

export default function InvoiceInformation() {
  return (
    <div className="flex justify-between  items-center border-b border-[#E5E7EB]">
      <div>
        <h2 className="font-bold text-[#0A0A0A] text-3xl ">
          فاتورة طلب
        </h2>
        <h6>رقم الطلب: 1234#</h6>
      </div>
      <div>
        <Logo type="dark" />
      </div>
    </div>
  );
}
