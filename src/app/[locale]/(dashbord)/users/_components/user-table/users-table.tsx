import { Table } from "@/components/ui/table";
import UserTableHeader from "./user-table-header";
import { Suspense } from "react";
import UsersTableWrapper from "./users-table-wrapper";
import TableLoadingSpinner from "@/src/components/shared/table-loading";

type UsersTableProps = {
  page: number;
  search: string;
  status: string;
};

export default function UsersTable({ page, search, status }: UsersTableProps) {
  return (
    <Table>
      {/* Header */}
      <UserTableHeader />

      {/* Body */}
      <Suspense
        key={`${page}-${search}-${status}`}
        fallback={<TableLoadingSpinner colSpan={9} />}
      >
        <UsersTableWrapper page={page} search={search} status={status} />
      </Suspense>
    </Table>
  );
}
