import UserOrders from "../_components/user-order";
import UserStats from "../_components/user-stats";
import PageTitleWithBack from "./_components/page-title-with-back";
import UserActions from "./_components/user-actions";
import UserDetails from "./_components/user-details";

export default function page() {
  const user = {
    id: "USR001",
    userName: "أحمد علي",
    organizationName: "مؤسسة النور",
    phoneNumber: "0501234567",
    status: "active",
    orders: [
      {
        orderId: 101,
        date: "2026-02-01",
        status: "completed",
        quantity: 5,
        price: 500,
      },
      {
        orderId: 102,
        date: "2026-02-03",
        status: "pending",
        quantity: 3,
        price: 360,
      },
      {
        orderId: 103,
        date: "2026-02-05",
        status: "completed",
        quantity: 2,
        price: 220,
      },
      {
        orderId: 104,
        date: "2026-02-07",
        status: "cancelled",
        quantity: 1,
        price: 120,
      },
      {
        orderId: 105,
        date: "2026-02-09",
        status: "completed",
        quantity: 4,
        price: 480,
      },
    ],
  };

  return (
    <main className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col space-y-6">
      <PageTitleWithBack title="بيانات المستخدم" backHref="/users" />

      {/* USER DETAILS */}
      <UserDetails />

      {/* userState */}
      <UserStats
        totalOrderCount={user.orders.length}
        totalPaid={user.orders.reduce((total, order) => total + order.price, 0)}
        lastOrderDate={user.orders[user.orders.length - 1].date}
      />

      {/* user orders */}
      <UserOrders userOrder={user.orders} />

      {/* user actions */}
      <UserActions />
    </main>
  );
}
