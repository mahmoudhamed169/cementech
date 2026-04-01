// payments/_components/stats-row.tsx
import DashboardStatCard from "../../_components/dashboard-statcard";

const STATS = [
  {
    key: "totalRevenue",
    title: "إجمالي الإيرادات",
    value: 1231,
    color: "text-[#101828]",
  },
  {
    key: "commission",
    title: "عمولة مكسبية",
    value: 2231,
    color: "text-green-600",
  },
  {
    key: "driverBonuses",
    title: "مكافآت السائقين",
    value: 931,
    color: "text-yellow-600",
  },
  {
    key: "pendingBonuses",
    title: "المكافآت المعلقة",
    value: 240,
    color: "text-red-600",
  },
];

export function StatsRow() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <DashboardStatCard
            key={stat.key}
            title={stat.title}
            value={stat.value}
            valueColor={stat.color}
          />
        ))}
      </div>
    </section>
  );
}
