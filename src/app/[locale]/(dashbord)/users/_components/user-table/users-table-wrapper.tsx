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
  const userRes = await getCustomers(2, 8); // Example: Fetch page 2 with 8 users per page
  console.log(userRes);
  const noUsers = [] as any[]; // Replace with actual users when API is ready
  const users = dummyUsers;

  const { page, pageCount } = userRes.meta; // Destructure the actual response to get users, total count, etc.

  return (
    <>
      <UsersTableBody users={userRes.data} />
      {users.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                <PaginationInfo
                  from={(page - 1) * 8 + 1}
                  to={Math.min(page * 8, userRes.meta.itemCount)}
                  total={userRes.meta.itemCount}
                  type="users"
                />
              </TableCell>
            </TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={pageCount}
                currentPage={page}
              />
            </TableCell>
          </TableFooter>
        </>
      )}
    </>
  );
}
