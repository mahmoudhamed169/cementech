import React from "react";
import FactoriesListHeader from "./factories-list-header";
import FactoriesTable from "./factories-table/factories-table";

export default function FactoriesList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <FactoriesListHeader />

      {/* users table */}
      <div className="flex-1 mt-4">
        {/* هنا الجدول */}
        <FactoriesTable />
      </div>
    </section>
  );
}
