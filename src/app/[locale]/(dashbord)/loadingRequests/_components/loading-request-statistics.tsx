import { cookies } from "next/headers";
import DashboardStatCard from "../../_components/dashboard-statcard";
import { getRequestsStats } from "@/src/lib/services/loading-requests/get-Requests-stats";

const statusColors: Record<string, string> = {
  received: "text-blue-600",
  approved: "text-green-600",
  factory_arrival: "text-purple-600",
  loading: "text-yellow-600",
  loaded: "text-emerald-600",
  rejected: "text-red-600",
  "تم استقبال": "text-blue-600",
  "تمت الموافقة": "text-green-600",
  "تم الوصول للمصنع": "text-purple-600",
  "جاري التحميل": "text-yellow-600",
  "تم التحميل": "text-emerald-600",
  مرفوض: "text-red-600",
};

export default async function LoadingRequestStatistics() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "ar";
  const { data } = await getRequestsStats(locale as "ar" | "en");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardStatCard
          title={locale === "ar" ? "الإجمالي" : "Total"}
          value={data.total}
          valueColor="text-gray-800"
        />
        {data.statuses.map((item) => (
          <DashboardStatCard
            key={item.status}
            title={item.status}
            value={item.totalRequests}
            valueColor={statusColors[item.status] ?? "text-gray-600"}
          />
        ))}
      </div>
    </section>
  );
}
