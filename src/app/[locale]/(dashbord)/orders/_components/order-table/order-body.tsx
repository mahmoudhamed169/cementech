"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";

import { Order } from "@/src/lib/types/orders/order";
import DriverStatusCell from "./driver-status-cell";
import OrderStatusCell from "./order-status-cell";
import OrderShipmentCell from "./order-shipment-cell";
import OrderQuantityCell from "./order-quantity-cell";
import OrderAssignDriver from "./order-assign-driver";

import OrdersTableEmpty from "./orders-table-empty";
import { Link } from "@/src/i18n/navigation";
import { Eye } from "lucide-react";
import { usePermissionsStore } from "@/src/store/permissionsStore";
import { useTranslations } from "next-intl";

dayjs.extend(relativeTime);

export default function OrderTableBody({ orders }: { orders: Order[] }) {
  const t = useTranslations("noAccess");
  const can = usePermissionsStore((s) => s.can);

  if (!can("order_permission", "GET"))
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12} className="h-40 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">🔒</span>
              <p className="text-gray-600 font-medium">{t("message")}</p>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );

  if (orders.length === 0) return <OrdersTableEmpty />;
  return (
    <TableBody>
      {orders.map((order, index) => {
        const remainingDrivers =
          order.truck_quantity - order.drivers_counts.accepted;

        return (
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
            <DriverStatusCell order={order} />

            {/* Order Status */}
            <OrderStatusCell status={order.order_status} />

            <TableCell>
              <p className="text-base font-bold text-gray-800">
                {order.product_name}
              </p>
              <p className="text-sm text-gray-500">{order.factory_name}</p>
            </TableCell>

            {/* order Shipment */}
            <OrderShipmentCell truckQuantity={order.truck_quantity} />

            {/* order Quantity */}
            <OrderQuantityCell quantity={order.quantity} />

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
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={
                    order.order_status === "canceled" ||
                    order.order_status === "ملغي"
                      ? "invisible"
                      : ""
                  }
                >
                  <OrderAssignDriver
                    remainingDrivers={remainingDrivers}
                    truckQuantity={order.truck_quantity}
                    orderCode={order.code}
                    orderId={order.id}
                    productId={order.product_id}
                    quantity={order.quantity}
                  />
                </div>

                <Link
                  href={`/orders/${order.id}`}
                  className="w-5 h-5 text-[#5E5C5C] cursor-pointer"
                >
                  <Eye className="w-5 h-5 text-[#5E5C5C] cursor-pointer hover:text-blue-800" />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
