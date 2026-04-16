import { Transaction } from "@/src/lib/services/payments/get-transactions-report";

export const TABLE_HEADERS = [
  "كود الفاتورة",
  "الكود",
  "النوع",
  "الحالة",
  "تكلفة الأسمنت",
  "تكلفة التوصيل",
  "عمولة المنصة",
  "رسوم البنك",
  "الإجمالي",
  "التاريخ",
];

export const STATUS_CLASS: Record<Transaction["status"], string> = {
  captured: "bg-green-50 text-green-700 ring-green-200",
  pending: "bg-amber-50  text-amber-700  ring-amber-200",
  refunded: "bg-red-50    text-red-700    ring-red-200",
};

export const TYPE_CLASS: Record<Transaction["transaction_Type"], string> = {
  order: "bg-blue-50   text-blue-700   ring-blue-200",
  request: "bg-purple-50 text-purple-700 ring-purple-200",
};
