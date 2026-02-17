import { Table } from "@/components/ui/table";
import UserTableHeader from "./user-table-header";
import { Suspense } from "react";
import TableLoading from "@/src/components/shared/table-loading";
import UsersTableWrapper from "./users-table-wrapper";

export default function UsersTable() {
  return (
    <Table>
      {/* Header */}
      <UserTableHeader />

      {/* Body */}
      <Suspense fallback={<TableLoading colSpan={9} />}>
        <UsersTableWrapper />
      </Suspense>
    </Table>
  );
}
