import DriversTable from "./driver-table/drivers-table";
import DriversHeaderList from "./drivers-header-list";

type DriverStatus = "free" | "offline" | "pending" | "blocked";
type LoadingStatus = "loaded" | "not loaded" | "pending";

interface DriversListProps {
  page?: number;
  limit?: number;
  search?: string;
  driverStatus?: DriverStatus; // ✅
  loadingStatus?: LoadingStatus; // ✅
}

export default function DriversList({
  page,
  limit,
  search,
  driverStatus,
  loadingStatus,
}: DriversListProps) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      <DriversHeaderList />
      <div className="flex-1 mt-4">
        <DriversTable
          page={page}
          limit={limit}
          search={search}
          driverStatus={driverStatus}
          loadingStatus={loadingStatus}
        />{" "}
        {/* ✅ */}
      </div>
    </section>
  );
}
