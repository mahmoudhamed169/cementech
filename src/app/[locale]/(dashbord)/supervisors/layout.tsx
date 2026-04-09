import { getUsersStats } from "@/src/lib/services/user-state";
import SupervisorsHeader from "./_components/supervisors-header";
import SupervisorStatistics from "./_components/supervisor-statistics";

export default async function SupervisorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = await getUsersStats({
    type: "admin",
    screen: "supervisor_permission",
  });

  return (
    <main className="min-h-screen pt-12 pb-5 px-6 space-y-6">
      <SupervisorsHeader />
      <SupervisorStatistics stats={stats.data} />

      {children}
    </main>
  );
}
