import UsersTable from "./users-table";
import UserHeaderList from "./user-header-list";

type UsersListProps = {
  page: number;
  search: string;
  status: string;
};

export default function UsersList({ page, search, status }: UsersListProps) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <UserHeaderList />

      {/* users table */}
      <div className="flex-1 mt-4">
        <UsersTable page={page} search={search} status={status} />
      </div>
    </section>
  );
}
