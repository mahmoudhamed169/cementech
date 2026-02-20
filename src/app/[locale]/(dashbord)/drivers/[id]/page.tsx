import React from "react";
import PageTitleWithBack from "../../users/[id]/_components/page-title-with-back";
import DriverDetails from "./_components/driver-details";
import DriverStats from "./_components/driver-state";
import DriverDocumentsSection from "./_components/driver-documents-section";

export default function page() {
  return (
    <main className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col space-y-6">
      <PageTitleWithBack title="بيانات السائق" backHref="/drivers" />

      {/* DRIVER DETAILS */}
      <DriverDetails />

      {/* DRIVER STATS */}
      <DriverStats
        totalOrderCount={25}
        totalPaid={1250}
        lastOrderDate="2025-01-24"
      />


      {/* بيانات التحميل */}
      


      {/* DRIVER DOCUMENTS */}
      <DriverDocumentsSection />

      {/*  */}
    </main>
  );
}
