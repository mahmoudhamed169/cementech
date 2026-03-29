import UsersList from "./_components/user-table/users-list";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page, search, status } = await searchParams;

  return (
    <UsersList
      page={page ? Number(page) : 1}
      search={search ?? ""}
      status={status ?? ""}
    />
  );
}
