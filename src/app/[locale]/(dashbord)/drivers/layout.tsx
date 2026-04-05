import DriversList from "./_components/drivers-list";
import DriverStatistics from "./_components/driver-statisctics";
import DriverPageHeader from "./_components/driver-header";
import React from "react";
import { getUsersStats } from "@/src/lib/services/user-state";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = await getUsersStats({ type: "driver" , screen: "driver_permission" });
  return (
    <div className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <DriverPageHeader />
      <DriverStatistics stats={stats.data} />
      {children}
    </div>
  );
}
