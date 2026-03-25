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
import OrderActionsWrapper from "./order-actions/_components/order-actions-wrapper";
import OrdersTableEmpty from "./orders-table-empty";

dayjs.extend(relativeTime);

export default function OrderTableBody({ orders }: { orders: Order[] }) {
  // console.log(orders);
  if (orders.length === 0) return <OrdersTableEmpty />;
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
          <DriverStatusCell hasDrivers={order.has_drivers} />

          {/* Order Status */}
          <OrderStatusCell status={order.order_status} />
          {/* <TableCell className="text-center">-</TableCell> */}

          <TableCell className="text-center font-medium">
            {order.product_name}
          </TableCell>

          {/* order Shipment */}
          <OrderShipmentCell truckQuantity={order.truck_quantity} />

          {/* order Quantatity */}
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
                  hasDrivers={order.has_drivers}
                  truckQuantity={order.truck_quantity}
                  orderCode={order.code}
                  orderId={order.id}
                  productId={order.product_id}
                  quantity={order.quantity}
                />
              </div>
              <OrderActionsWrapper orderId={order.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
