import { Table } from "@/components/ui/table";
import UserTableHeader from "./user-table-header";
import { Suspense } from "react";
import UsersTableWrapper from "./users-table-wrapper";
import TableLoadingSpinner from "@/src/components/shared/table-loading";

export default function UsersTable() {
  return (
    <Table>
      {/* Header */}
      <UserTableHeader />

      {/* Body */}
      <Suspense fallback={<TableLoadingSpinner colSpan={9} />}>
        <UsersTableWrapper />
      </Suspense>
    </Table>
  );
}
