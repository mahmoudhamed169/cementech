import { cookies } from "next/headers"; // ✅
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import PaginationInfo from "@/src/components/shared/pagination-info";
import SupervisorsTableBody from "./supervisors-table-body";
import { getUsers } from "@/src/lib/services/users";
import { ApiSupervisor } from "@/src/lib/types/admin/admin";
import { DynamicPagination } from "@/src/components/shared/pagination";

interface SearchParams {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
}

interface Props {
  searchParams: SearchParams;
}

export default async function SupervisorsTableWrapper({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const search = searchParams?.search || "";
  const status =
    (searchParams?.status as "all" | "active" | "inactive" | "blocked") ||
    "all";

  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "ar";

  const supervisors = await getUsers<ApiSupervisor>({
    page,
    limit,
    search,
    status,
    type: "admin",
    screen: "supervisors_permissions",
    lang: locale, // ✅
  });

  const { itemCount, pageCount } = supervisors.meta;

  return (
    <>
      <SupervisorsTableBody data={supervisors.data} page={page} limit={limit} />

      <TableFooter>
        <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
          <TableCell colSpan={7}>
            <PaginationInfo
              from={(page - 1) * limit + 1}
              to={Math.min(page * limit, itemCount)}
              total={itemCount}
              type="supervisors"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-center" colSpan={7}>
            <DynamicPagination totalPages={pageCount} currentPage={page} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
}
