import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Eye } from "lucide-react";
import { UserOrder } from "@/src/lib/services/users/user-orders";
import OrderStatusCell from "../../../orders/_components/order-table/order-status-cell";
import OrderActionsWrapper from "../../../orders/_components/order-table/order-actions/_components/order-actions-wrapper";
import { Link } from "@/src/i18n/navigation";

interface IProps {
  orders: UserOrder[];
}

export default function UserOrdersBody({ orders }: IProps) {
  return (
    <TableBody>
      {orders.map((order, index) => (
        <TableRow
          key={order.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          <TableCell className="text-center">{index + 1}</TableCell>
          <TableCell className="text-center font-medium">
            #{order.code}
          </TableCell>
          <TableCell className="text-center font-medium">
            {new Date(order.created_at).toLocaleDateString()}
          </TableCell>
          <TableCell className="text-center font-medium">
            {order.quantity}
          </TableCell>

          <OrderStatusCell status={order.order_status} />

          <TableCell className="text-center">
            {/* <div className="flex items-center justify-center">
              <OrderActionsWrapper orderId={order.id} />
            </div> */}
            <div className="flex items-center justify-center">
              <Link
                href={`/orders/${order.id}`}
                className="w-5 h-5 text-[#5E5C5C] cursor-pointer"
              >
                <Eye className="w-5 h-5 text-[#5E5C5C] cursor-pointer hover:text-blue-800" />
              </Link>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
