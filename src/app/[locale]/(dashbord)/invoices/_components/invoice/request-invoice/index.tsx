"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisVertical, Loader2, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";

import InvoiceHeader from "./_components/invoice-header";
import DriverDetails from "./_components/driver-details";
import RequestDetails from "./_components/request-details";

import RequestPaymentDetails from "./_components/payment-details";
import ImportantNotes from "../_components/important-notes";
import { useRequestInvoiceDetails } from "../../../_hooks/use-request-invoice-details";
import TransactionDetails from "./_components/transactions-details";

interface Props {
  id: string;
}

export function RequestInvoiceModalContent({ id }: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useRequestInvoiceDetails(id);
  const invoiceData = data?.data;

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `request-invoice-${invoiceData?.invoice_details.code ?? id}`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-6 h-6 bg-[#5E5C5C] p-0.5 flex justify-center items-center rounded-lg cursor-pointer">
          <EllipsisVertical className="stroke-white w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-275 bg-white border-0 p-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 py-7 shrink-0 border-b border-[#E5E7EB]">
          <DialogTitle className="font-bold text-xl flex justify-between items-center">
            عرض الفاتورة
            <Button
              onClick={handlePrint}
              disabled={isLoading || isError}
              className="min-w-27 min-h-11 p-3 bg-[#4F39F6] text-white"
            >
              <Printer />
              طباعة
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto flex flex-col">
          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
              <Loader2 size={28} className="text-gray-400 animate-spin" />
              <p className="text-sm text-gray-400">جاري تحميل الفاتورة...</p>
            </div>
          )}

          {isError && (
            <div className="flex-1 flex items-center justify-center py-16">
              <p className="text-sm text-red-500">
                حدث خطأ أثناء تحميل الفاتورة
              </p>
            </div>
          )}

          {invoiceData && (
            <div ref={invoiceRef} id="request-invoice-print-area">
              <section className="px-4 py-6 space-y-8 w-full" dir="rtl">
                <InvoiceHeader
                  invoiceCode={invoiceData.invoice_details.code}
                  requestCode={invoiceData.request_details.code}
                />
                <div className="flex gap-6 w-full print:flex-col print:gap-4">
                  <div className="flex-1">
                    <DriverDetails driver={invoiceData.driver} />
                  </div>
                  <div className="flex-1">
                    <RequestDetails request={invoiceData.request_details} />
                  </div>
                </div>
                <TransactionDetails
                  transactions={invoiceData.payment.transactions}
                />
                <div className="flex gap-13 print:flex-col print:gap-6">
                  <RequestPaymentDetails payment={invoiceData.payment} />
                  <ImportantNotes />
                </div>
              </section>

              <div className="invoice-footer">
                <div className="px-10 pt-6 pb-5 border-t border-[#E5E7EB] text-[#6A7282]">
                  <div className="flex flex-col items-end">
                    <div className="w-[205px] h-10 border-b-2 border-[#0A0A0A] mb-1" />
                    <p className="text-sm text-[#0A0A0A] me-6">
                      توقيع المحاسب المعتمد
                    </p>
                  </div>
                  <div className="flex gap-1.5 items-center justify-center mt-10">
                    <p>لاي استفسارات برجاء التواصل معنا عل الرقم</p>
                    <p className="font-bold">789 456 123 (+966)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
