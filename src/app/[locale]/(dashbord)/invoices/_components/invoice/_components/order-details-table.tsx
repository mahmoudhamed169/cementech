import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import React from "react";

type OrderShipment = {
  description: string;
  quantity: number; // بالطن
  cementType: string;
  pricePerTon: number;
  totalPrice: number;
};

const shipments: OrderShipment[] = [
  {
    description: "الشحنة الأولى",
    quantity: 10,
    cementType: "أسمنت بورتلاندي عادي",
    pricePerTon: 280,
    totalPrice: 2800,
  },
  {
    description: "الشحنة الثانية",
    quantity: 15,
    cementType: "أسمنت مقاوم للأملاح",
    pricePerTon: 300,
    totalPrice: 4500,
  },
  {
    description: "الشحنة الثالثة",
    quantity: 8,
    cementType: "أسمنت أبيض",
    pricePerTon: 350,
    totalPrice: 2800,
  },
];

export default function OrderDetailsTable() {
  const headers = [
    "الوصف",
    "الكمية",
    "نوع الأسمنت",
    "السعر ( الطن )",
    "اجمالي السعر",
  ] as const;
  return (
    <Table>
      {/* Header */}
      <TableHeader className=" border-[#F3F4F6]">
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
        {shipments.map((shipment, index) => (
          <TableRow key={index} className="text-[#364153] border-[#F3F4F6]">
            <TableCell className="text-center">
              {shipment.description}
            </TableCell>
            <TableCell className="text-center">
              {shipment.quantity} طن
            </TableCell>
            <TableCell className="text-center">{shipment.cementType}</TableCell>
            <TableCell className="text-center">
              <div className="flex  justify-center items-center  gap-1">
                {shipment.pricePerTon} <CurrencyIcon />
              </div>
            </TableCell>
            <TableCell className="text-center font-semibold">
              <div className="flex  justify-center items-center  gap-1">
                {shipment.totalPrice} <CurrencyIcon />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
