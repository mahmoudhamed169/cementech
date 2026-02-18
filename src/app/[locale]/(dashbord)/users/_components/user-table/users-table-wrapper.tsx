import { dummyUsers } from "@/src/lib/constants/user";

import { getUsers } from "@/src/lib/services/users";
import UsersTableBody from "./users-table-body";

import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";

async function getCustomer() {
  const response = await getUsers({
    type: "customer",
    page: 1,
    limit: 8,
  });
  return response;
}

export default async function UsersTableWrapper() {
  const userRes = await getCustomer();
  console.log(userRes);
  const noUsers = [] as any[]; // Replace with actual users when API is ready
  const users = dummyUsers;

  const { page, pageCount } = userRes.meta; // Destructure the actual response to get users, total count, etc.

  return (
    <>
      <UsersTableBody users={users} />
      {users.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                <PaginationInfo
                  from={1}
                  to={8}
                  total={users.length}
                  type="users"
                />
              </TableCell>
            </TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={users.length / 8}
                currentPage={page}
              />
            </TableCell>
          </TableFooter>
        </>
      )}
    </>
  );
}
