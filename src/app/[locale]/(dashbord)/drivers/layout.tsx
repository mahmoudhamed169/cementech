import DriversList from "./_components/drivers-list";
import DriverStatistics from "./_components/driver-statisctics";
import DriverPageHeader from "./_components/driver-header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <DriverPageHeader />
      <DriverStatistics />
      {children}
    </div>
  );
}
