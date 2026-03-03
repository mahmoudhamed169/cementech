import { dummyUsers } from "@/src/lib/constants/user";

import { getUsers } from "@/src/lib/services/users";
import UsersTableBody from "./users-table-body";

import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Customer } from "@/src/lib/types/users";

export async function getCustomers(page = 1, limit = 8) {
  const response = await getUsers<Customer>({
    type: "customer",
    page,
    limit,
  });
  return response;
}

export default async function UsersTableWrapper() {
  const users = await getCustomers(1, 10);

  const { page, pageCount } = users.meta;

  return (
    <>
      <UsersTableBody users={users.data} />
      {users.data.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                <PaginationInfo
                  from={(page - 1) * 8 + 1}
                  to={Math.min(page * 8, users.meta.itemCount)}
                  total={users.meta.itemCount}
                  type="users"
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
