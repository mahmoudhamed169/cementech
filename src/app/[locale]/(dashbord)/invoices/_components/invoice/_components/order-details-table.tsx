import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import {
  OrderDetails,
  Product,
} from "@/src/lib/types/invoices/invoice-details";
import React from "react";

export default function OrderDetailsTable({
  order,
  product,
}: {
  order: OrderDetails;
  product: Product;
}) {
  const headers = [
    "الكمية",
    "نوع الأسمنت",
    "السعر ( الطن )",
    "سعر التوصيل",
    "رسوم البنك",
    "رسوم سيمنتك",
    "اجمالي السعر",
  ] as const;

  const rows = [
    {
      description: "الطلب",
      quantity: order.quantity,
      cementType: product.name,
      pricePerTon: product.price,
      deliveryFee: order.delivery_fee,
      bankFee: order.bank_fee,
      platformFee: order.platform_fee,
      totalPrice: order.total,
    },
  ];

  return (
    <Table>
      {/* Header */}
      <TableHeader className="border-[#F3F4F6]">
        <TableRow>
          {headers.map((key) => (
            <TableHead
              key={key}
              className="text-center text-[#364153] font-bold h-11 bg-[#E5E7EB]"
            >
              {key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index} className="text-[#364153] border-[#F3F4F6]">
            <TableCell className="text-center">{row.quantity} طن</TableCell>
            <TableCell className="text-center">{row.cementType}</TableCell>

            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-1">
                {row.pricePerTon} <CurrencyIcon />
              </div>
            </TableCell>

            {/* سعر التوصيل */}
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-1">
                {row.deliveryFee} <CurrencyIcon />
              </div>
            </TableCell>

            {/* رسوم البنك */}
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-1">
                {row.bankFee} <CurrencyIcon />
              </div>
            </TableCell>

            {/* رسوم المنصة */}
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-1">
                {row.platformFee} <CurrencyIcon />
              </div>
            </TableCell>

            {/* الإجمالي */}
            <TableCell className="text-center font-semibold">
              <div className="flex justify-center items-center gap-1">
                {row.totalPrice} <CurrencyIcon />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}