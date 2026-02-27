"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { DeliveryStatusBadge } from "../../../_components/deliver-status-badge";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { AssigneDriver } from "@/src/components/shared/assigne-driver-dialog";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { OrderActions } from "@/src/components/shared/order-actions";
import { useTranslations } from "next-intl";
import { mapOrderStatus } from "@/src/lib/utils/order-status";
import { Order } from "@/src/lib/types/orders/order";

dayjs.extend(relativeTime);

export default function OrderTableBody({ orders }: { orders: Order[] }) {
  const t = useTranslations("recentOrders");

  return (
    <TableBody>
      {orders.map((order, index) => (
        <TableRow
          key={order.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          {/* index */}
          <TableCell className="text-center">{index + 1}</TableCell>

          {/* orderId */}
          <TableCell className="text-center font-medium">
            {order.code}
          </TableCell>

          {/* customer Phone Number */}
          <TableCell className="text-center">
            {order.customer_name ? order.customer_name : "-"}
            <p className="text-[#6A7282]">{order.phone}</p>
          </TableCell>

          {/* driver Status ( has or not ) */}
          <TableCell className="text-center">
            {order.has_drivers ? (
              <span className="text-[#364153] font-medium">
                {t(`driverStatus.assigned`)}
              </span>
            ) : (
              <span className="font-medium text-[#9F0712]">
                ({t(`driverStatus.unassigned`)})
              </span>
            )}
          </TableCell>

          {/* Order Status */}
          <TableCell className="text-center">
            <DeliveryStatusBadge status={mapOrderStatus(order.order_status)} />
          </TableCell>

          {/* order Shipment */}
          <TableCell className="text-center">
            {order.truck_quantity}{" "}
            {order.truck_quantity === 1
              ? t("shipmentLabel.one")
              : t("shipmentLabel.many")}
          </TableCell>

          {/* order Quantatity */}
          <TableCell className="text-center">
            {order.quantity}{" "}
            {order.quantity === 1 ? t("weightUnit.one") : t("weightUnit.many")}
          </TableCell>

          {/* order price */}
          <TableCell className="text-center flex items-center justify-center gap-1 mt-3.5">
            <span className="text-sm leading-none">{order.total}</span>
            <CurrencyIcon />
          </TableCell>

          {/* الوقت النسبي */}
          <TableCell className="text-center">
            <TimeAgo time={order.created_at} />
          </TableCell>

          {/* options actions */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center">
                {order.has_drivers === false && (
                  <div title="لم يتم تعيين سائق">
                    <AssigneDriver
                      numOfShipments={order.truck_quantity}
                      orderCode={order.code}
                      orderId={order.id}
                    >
                      <Button>
                        <UserRoundPlus className="stroke-[#FB2C36]" size={24} />
                      </Button>
                    </AssigneDriver>
                  </div>
                )}
              </div>

              <OrderActions order={order} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
