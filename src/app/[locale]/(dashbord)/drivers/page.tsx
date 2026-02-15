import React from "react";
import DriverPageHeader from "./_components/driver-header";
import DriverStatistics from "./_components/driver-statisctics";
import DriversList from "./_components/drivers-list";

export default function page() {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <DriverPageHeader />
      <DriverStatistics />
      <DriversList />
    </main>
  );
}
