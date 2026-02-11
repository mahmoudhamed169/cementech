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
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { invoicesData } from "@/src/lib/constants/invoice";
import { EllipsisVertical } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InvoicesTable() {
  const headers = [
    "index",
    "invoicesId",
    "orderId",
    "userName",
    "userPhoneNumber",
    "date",
    "totalPaid",
    "actions",
  ] as const;

  const t = useTranslations("InvoicesPage.invoicesTable.columns");

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

      {/* body */}
      <TableBody>
        {invoicesData.map((item, index) => (
          <TableRow
            key={item.id}
            className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
          >
            {/* index */}
            <TableCell className="text-center">{index + 1}</TableCell>

            {/* invoices number */}
            <TableCell className="text-center font-medium">
              #{item.invoiceId}
            </TableCell>
            {/* order number */}
            <TableCell className="text-center font-medium">
              #{item.orderId}
            </TableCell>

            {/*  client Name */}
            <TableCell className="text-center font-medium">
              {item.userName}
            </TableCell>

            {/* phoneNumber */}
            <TableCell className="text-center font-medium">
              {item.userPhoneNumber}
            </TableCell>

            {/* date */}
            <TableCell className="text-center font-medium">
              {item.date}
            </TableCell>

            {/* totalPaid */}
            <TableCell className="text-center flex items-center justify-center gap-1 mt-3">
              <span>{item.totalPaid}</span>
              <CurrencyIcon />
            </TableCell>

            {/* actions */}
            <TableCell className="text-center">
              <div className="w-full flex items-center justify-center">
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
