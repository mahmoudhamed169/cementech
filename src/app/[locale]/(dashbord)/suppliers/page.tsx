import FactoriesList from "./_components/factories-list";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    is_active?: string;
  }>;
}

export default async function page({ searchParams }: Props) {
  const { page, limit, search, is_active } = await searchParams;

  return (
    <FactoriesList
      page={page ? Number(page) : 1}
      limit={limit ? Number(limit) : 10}
      search={search ?? ""}
      is_active={
        is_active === "false" ? false : is_active === "true" ? true : true
      }
    />
  );
}
