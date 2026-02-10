"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/src/lib/constants/user";
import { EllipsisVertical } from "lucide-react";
import { useTranslations } from "next-intl";

type IProps = {
  userOrder: Order[];
};

export default function UserOrdersList({ userOrder }: IProps) {
  const headers = [
    "index",
    "orderNumber",
    "data",
    "quantity",
    "orderState",
    "actions",
  ] as const;

  const t = useTranslations("userPage.userOrderTable.colums");

  return (
    <Table>
      {/* Header */}
      <TableHeader>
        <TableRow>
          {headers.map((key) => (
            <TableHead
              key={key}
              className="text-center text-[#364153] font-bold h-11"
            >
              {t(key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {userOrder.map((order, index) => (
          <TableRow
            key={order.orderId}
            className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
          >
            {/* index */}
            <TableCell className="text-center">{index + 1}</TableCell>

            {/* رقم الطلب id */}
            <TableCell className="text-center font-medium">
              #{order.orderId}
            </TableCell>

            {/* تاريخ الطلب*/}
            <TableCell className="text-center font-medium">
              {order.date}
            </TableCell>

            {/* الكمية */}
            <TableCell className="text-center font-medium">
              {order.quantity}
            </TableCell>

            {/* حالة الطلب */}
            <TableCell className="text-center font-medium">
              {order.status}
            </TableCell>

            {/* actions */}
            <TableCell className="text-center">
              <div className="flex items-center justify-center">
                <Button className="w-6 h-6 bg-[#5E5C5C] p-0.5 flex justify-center items-center rounded-lg cursor-pointer">
                  <EllipsisVertical className="stroke-white w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
