import SupervisorsList from "./_components/supervisors-list";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams; // ✅ هنا بس الـ await

  return <SupervisorsList searchParams={resolvedSearchParams} />;
}
