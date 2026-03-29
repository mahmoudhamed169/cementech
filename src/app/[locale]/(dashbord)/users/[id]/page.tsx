import { fetchCustomerProfile } from "@/src/lib/services/users/user-profile";
import UserStats from "../_components/user-stats";
import UserActions from "./_components/user-actions";
import UserDetails from "./_components/user-details";
import UserOrders from "./_components/user-order";
import UserPageTitle from "./_components/user-page-title";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string; // ✅ بدل orderPage
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams; // ✅
  const user = await fetchCustomerProfile(id);

  return (
    <main className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col space-y-6">
      <UserPageTitle />
      {/* USER DETAILS */}
      <UserDetails user={user} />
      {/* USER STATS */}
      <UserStats
        totalOrderCount={user.stats.totalOrders}
        totalPaid={user.stats.totalPaid}
        lastOrderDate={
          user.stats.lastOrderDate
            ? new Date(user.stats.lastOrderDate).toLocaleDateString("ar-EG")
            : "لا توجد طلبات بعد"
        }
      />
      {/* USER ORDERS */}
      <UserOrders userId={id} page={page ? Number(page) : 1} />
      {/* USER ACTIONS */}
      <UserActions user={user} />
    </main>
  );
}
