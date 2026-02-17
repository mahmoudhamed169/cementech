import { dummyUsers } from "@/src/lib/constants/user";

import { getUsers } from "@/src/lib/services/users";
import UsersTableBody from "./users-table-body";
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

      {/* <PaginationInfo from={1} to={8} total={users.length} type="users" /> */}
    </>
  );
}
