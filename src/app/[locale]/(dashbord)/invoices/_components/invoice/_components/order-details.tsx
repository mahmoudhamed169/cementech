import React from "react";
import OrderDetailsTable from "./order-details-table";
import { InvoiceDetails } from "@/src/lib/types/invoices/invoice-details";

export default function OrderDetails({ invoice }: { invoice: InvoiceDetails }) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-[#0A0A0A] text-xl ">تفاصيل الطلب</h2>
      <OrderDetailsTable />
    </div>
  );
}
