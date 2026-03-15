import UserOrdersHeader from "./user-orders-header";
import UserOrdersList from "./user-orders-list";

interface IProps {
  userId: string;
  page?: number; // ✅
}

export default function UserOrders({ userId, page }: IProps) {
  return (
    <div className="space-y-4">
      <UserOrdersHeader />
      <UserOrdersList userId={userId} page={page} />
    </div>
  );
}
