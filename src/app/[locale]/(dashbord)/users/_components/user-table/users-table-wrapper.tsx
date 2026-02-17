import { dummyUsers } from "@/src/lib/constants/user";

import { getUsers } from "@/src/lib/services/users";
import UsersTableBody from "./users-table-body";

import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";

async function getCustomer() {
  const response = await getUsers({
    type: "customer",
    page: 1,
    limit: 8,
  });
  return response.data;
}

export default async function UsersTableWrapper() {
  const userRes = await getCustomer();
  console.log(userRes);
  const noUsers = [] as any[]; // Replace with actual users when API is ready
  const users = dummyUsers;

  return (
    <>
      <UsersTableBody users={users} />
      <DynamicPagination totalPages={5} currentPage={1} />

    </>
  );
}
