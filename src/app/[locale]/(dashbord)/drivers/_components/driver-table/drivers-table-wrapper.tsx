import DriversTableBody from "./drivers-table-body";
import { getUsers } from "@/src/lib/services/users";
import { Driver } from "@/src/lib/types/users";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { DynamicPagination } from "@/src/components/shared/pagination";

type DriverStatus = "free" | "offline" | "pending" | "blocked";
type LoadingStatus = "loaded" | "not loaded" | "pending";

export async function getDrivers(
  page = 1,
  limit = 10,
  search?: string,
  driverStatus?: DriverStatus,
  loadingStatus?: LoadingStatus,
) {
  const response = await getUsers<Driver>({
    type: "driver",
    page,
    limit,
    search,
    driverStatus, // ✅
    requestStatus: loadingStatus, // ✅
    screen: "driver_permission",
  });
  return response;
}

interface DriversTableWrapperProps {
  page?: number;
  limit?: number;
  search?: string;
  driverStatus?: DriverStatus; // ✅
  loadingStatus?: LoadingStatus; // ✅
}

export default async function DriversTableWrapper({
  page = 1,
  limit = 10,
  search,
  driverStatus, // ✅
  loadingStatus, // ✅
}: DriversTableWrapperProps) {
  const drivers = await getDrivers(
    page,
    limit,
    search,
    driverStatus,
    loadingStatus,
  ); // ✅
  const { page: currentPage, pageCount } = drivers.meta;

  return (
    <>
      <DriversTableBody drivers={drivers.data} />
      {drivers.data.length > 0 && (
        <TableFooter>
          <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
            <TableCell colSpan={9}>
              <PaginationInfo
                from={(currentPage - 1) * limit + 1}
                to={Math.min(currentPage * limit, drivers.meta.itemCount)}
                total={drivers.meta.itemCount}
                type="drivers"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={pageCount}
                currentPage={currentPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}
