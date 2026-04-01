// app/payments/matching/page.tsx
import { MatchingFilters } from "./_components/matching-filters";
import { MatchingTable } from "./_components/matching-table";

interface SearchParams {
  search?: string;
  status?: string;
}

interface Props {
  searchParams: SearchParams;
}

export default function MatchingPage({ searchParams }: Props) {
  return (
    <section className="space-y-8">
      <MatchingFilters currentStatus={searchParams.status} />
      <MatchingTable />
    </section>
  );
}
