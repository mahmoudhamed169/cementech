import { getUsers } from "@/src/lib/services/users";
import UsersTableBody from "./users-table-body";

import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Customer } from "@/src/lib/types/users";

type UsersTableWrapperProps = {
  page: number;
  search: string;
  status: string;
  limit?: number;
};

export default async function UsersTableWrapper({
  page,
  search,
  status,
  limit = 10,
}: UsersTableWrapperProps) {
  const users = await getUsers<Customer>({
    type: "customer",
    page,
    limit,
    search,
    status,
    screen: "user_permission",
  });

  const { page: currentPage, pageCount } = users.meta;

  return (
    <>
      <UsersTableBody users={users.data} />

      {users.data.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                <PaginationInfo
                  from={(currentPage - 1) * limit + 1}
                  to={Math.min(currentPage * limit, users.meta.itemCount)}
                  total={users.meta.itemCount}
                  type="users"
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
        </>
      )}
    </>
  );
}
