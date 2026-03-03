
import DriversTableBody from "./drivers-table-body";
import { getUsers } from "@/src/lib/services/users";
import { Driver } from "@/src/lib/types/users";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { DynamicPagination } from "@/src/components/shared/pagination";

export async function getDrivers(page = 1, limit = 8) {
  const response = await getUsers<Driver>({
    type: "driver",
    page,
    limit,
  });
  return response;
}

export default async function DriversTableWrapper() {
  const drivers = await getDrivers(1, 10);
  const { page, pageCount } = drivers.meta;

  return (
    <>
      <DriversTableBody drivers={drivers.data} />;
      {drivers.data.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                {/* Pagination info would go here */}
                <PaginationInfo
                  from={(page - 1) * 8 + 1}
                  to={Math.min(page * 8, drivers.meta.itemCount)}
                  total={drivers.meta.itemCount}
                  type="drivers"
                />
              </TableCell>
            </TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination totalPages={pageCount} currentPage={page} />
            </TableCell>
          </TableFooter>
        </>
      )}
    </>
  );
}
