"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeliveryStatusBadge } from "./deliver-status-badge";
import { AlertCircle, EllipsisVertical, UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { Orders } from "@/src/lib/constants/order";
import { OrderActions } from "@/src/components/shared/order-actions";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { AssigneDriver } from "@/src/components/shared/assigne-driver-dialog";
import { Button } from "@/components/ui/button";

dayjs.extend(relativeTime);

function mapOrderStatus(status: string) {
  switch (status) {
    case "delivering":
      return "delivering";
    case "completed":
      return "completed";
    default:
      return "pending";
  }
}

export function RecentOrdersTable() {
  const t = useTranslations("recentOrders");
  const headers = [
    "index",
    "orderId",
    "customer",
    "driverStatus",
    "deliveryStatus",
    "shipments",
    "quantity",
    "price",
    "time",
    "actions",
  ];

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
              {t(`header.${key}`)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {Orders.slice(0, 8).map((order, index) => (
          <TableRow
            key={order.id}
            className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
          >
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center font-medium">
              {order.id}
            </TableCell>
            <TableCell className="text-center">
              {order.customer.name}{" "}
              <p className="text-[#6A7282]">{order.customer.phone}</p>
            </TableCell>
            <TableCell className="text-center">
              {order.driverStatus === "unassigned" ? (
                <span className="font-medium text-[#9F0712] ">
                  ( {t(`driverStatus.${order.driverStatus}`)} )
                </span>
              ) : (
                <span className="text-[#364153] font-medium">
                  {t(`driverStatus.${order.driverStatus}`)}
                </span>
              )}
            </TableCell>

            <TableCell className="text-center">
              <DeliveryStatusBadge status={mapOrderStatus(order.orderStatus)} />
            </TableCell>
            <TableCell className="text-center">
              {order.shipments}{" "}
              {order.shipments === 1
                ? t("shipmentLabel.one")
                : t("shipmentLabel.many")}
            </TableCell>

            <TableCell className="text-center">
              {order.quantity}{" "}
              {order.quantity === 1
                ? t("weightUnit.one")
                : t("weightUnit.many")}
            </TableCell>

            <TableCell className="text-center flex items-center justify-center gap-1 mt-3.5">
              <span className="text-sm leading-none">{order.price}</span>
              <CurrencyIcon />
            </TableCell>

            {/* الوقت النسبي */}
            <TableCell className="text-center">
              <TimeAgo time={order.time} />
            </TableCell>

            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2.5">
                {/* مساحة ثابتة للأيقونة التحذيرية */}
                <div className="w-5 h-5 flex items-center justify-center">
                  {order.driverStatus === "unassigned" && (
                    <div title="لم يتم تعيين سائق">
                      <AssigneDriver
                        numOfShipments={order.shipments}
                        orderId={order.id}
                      >
                        <Button>
                          <UserRoundPlus
                            className="stroke-[#FB2C36]"
                            size={24}
                          />
                        </Button>
                      </AssigneDriver>
                    </div>
                  )}
                </div>

                {/* الاجراءات
                 */}

                <OrderActions order={order} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
