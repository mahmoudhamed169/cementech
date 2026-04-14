// matching/page.tsx
import { MatchingFilters } from "./_components/matching-filters";
import { MatchingTable } from "./_components/matching-table";

interface SearchParams {
  search?: string;
  status?: string;
  page?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function MatchingPage({ searchParams }: Props) {
  const { search, status, page } = await searchParams;

  return (
    <section className="space-y-8">
      <MatchingFilters currentStatus={status} />
      <MatchingTable
        search={search}
        status={status}
        page={page ? Number(page) : 1}
      />
    </section>
  );
}
