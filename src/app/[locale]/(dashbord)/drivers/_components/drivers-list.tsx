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
    </section>
  );
}
