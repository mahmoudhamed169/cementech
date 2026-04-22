import UserOrdersHeader from "./user-orders-header";
import UserOrdersList from "./user-orders-list";

interface IProps {
  userId: string;
  page?: number;
  systemScreen?: "user_permission" | "driver_permission"; // ✅
}

export default function UserOrders({ userId, page, systemScreen }: IProps) {
  return (
    <div className="space-y-4">
      <UserOrdersHeader />
      <UserOrdersList userId={userId} page={page} systemScreen={systemScreen} />
    </div>
  );
}
