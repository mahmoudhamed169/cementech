import SearchInput from "@/src/components/shared/search-input";
import React from "react";
import DriversTable from "./drivers-table";

export default function DriversList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-bold text-lg text-[#101828]">السائقين</h3>

        <div className="flex flex-wrap items-center gap-4">
          <div className="w-65">
            <SearchInput placeholder="ابحث عن اسم او رقم جوال ..." />
          </div>
        </div>
      </div>

      {/* users table */}
      <div className="flex-1 mt-4">
        {/* هنا الجدول */}
        <DriversTable />
      </div>

      {/* Pagination / Info */}
      <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
        <h3 className="text-end text-sm text-[#475467]">
          عرض (1-8) من أصل 150 مستخدم
        </h3>
      </div>
    </section>
  );
}
