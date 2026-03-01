import React from "react";
import UserHeader from "./_components/user-header";
import UsersStatisctics from "./_components/users-statisctics";
import { getUsersStats } from "@/src/lib/services/user-state";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = await getUsersStats({ type: "customer" });

  return (
    <main className="min-h-screen pt-12 pb-5 px-6 space-y-6">
      <UserHeader />
      <UsersStatisctics stats={stats.data} />
      {children}
    </main>
  );
}
