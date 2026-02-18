
import DriversTable from "./driver-table/drivers-table";
import DriversHeaderList from "./drivers-header-list";

export default function DriversList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <DriversHeaderList />
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
