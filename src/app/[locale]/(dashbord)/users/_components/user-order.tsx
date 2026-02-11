import { Order } from "@/src/lib/constants/user";
import UserOrdersList from "./user-orders-list";

type IProps = {
  userOrder: Order[];
};

export default function UserOrders({ userOrder }: IProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-[#101828] text-lg">تاريخ الطلبات</h4>
      {/* <UserOrdersList userOrder={userOrder} /> */}
    </div>
  );
}
