import { TableCell, TableFooter, TableRow } from "@/components/ui/table";

import PaginationInfo from "@/src/components/shared/pagination-info";
import { PaymentsTableBody } from "./payments-table-body";
import { DynamicPagination } from "@/src/components/shared/pagination";

const STATIC_PAYMENTS = [
  {
    id: 1,
    transactionId: "#1284",
    requestId: "#1284",
    driverName: "أحمد علاء",
    driverPhone: "+966 123 456789",
    clientName: "أحمد علاء",
    clientPhone: "+966 123 456789",
    amountPaid: 21000,
    commission: 60,
    paymentMethod: "بطاقة",
    paymentStatus: "مكتمل",
    transactionDate: "10-01-2026",
  },
  {
    id: 2,
    transactionId: "#1283",
    requestId: "#1283",
    driverName: "علاء أحمد",
    driverPhone: "+966 123 456789",
    clientName: "علاء أحمد",
    clientPhone: "+966 123 456789",
    amountPaid: 21000,
    commission: 30,
    paymentMethod: "نقدي",
    paymentStatus: "مكتمل",
    transactionDate: "10-01-2026",
  },
  {
    id: 3,
    transactionId: "#1282",
    requestId: "#1282",
    driverName: "مؤنس الشاوي",
    driverPhone: "+966 123 456789",
    clientName: "مؤنس الشاوي",
    clientPhone: "+966 123 456789",
    amountPaid: 21000,
    commission: 25,
    paymentMethod: "تمارا",
    paymentStatus: "قيد الانتظار",
    transactionDate: "20-01-2026",
  },
  {
    id: 4,
    transactionId: "#1281",
    requestId: "#1281",
    driverName: "محمود رزق",
    driverPhone: "+966 123 456789",
    clientName: "محمود رزق",
    clientPhone: "+966 123 456789",
    amountPaid: 21000,
    commission: 90,
    paymentMethod: "بطاقة",
    paymentStatus: "مكتمل",
    transactionDate: "13-01-2026",
  },
];

const currentPage = 1;
const limit = 10;
const total = STATIC_PAYMENTS.length;
const pageCount = Math.ceil(total / limit);

export default function PaymentsTableWrapper() {
  return (
    <>
      <PaymentsTableBody payments={STATIC_PAYMENTS} />

      {STATIC_PAYMENTS.length > 0 && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={9}>
              <PaginationInfo
                from={(currentPage - 1) * limit + 1}
                to={Math.min(currentPage * limit, total)}
                total={total}
                type="users"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={pageCount}
                currentPage={currentPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}
