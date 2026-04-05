import React from "react";
import FactoriesListHeader from "./factories-list-header";
import FactoriesTable from "./factories-table/factories-table";

interface Props {
  page: number;
  limit: number;
  search: string;
  is_active?: boolean;
}

export default function FactoriesList({
  page,
  limit,
  search,
  is_active,
}: Props) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <FactoriesListHeader />

      {/* table */}
      <div className="flex-1 mt-4">
        <FactoriesTable
          page={page}
          limit={limit}
          search={search}
          is_active={is_active}
        />
      </div>
    </section>
  );
}
