import { PaymentsFilters } from "./_components/payments-filters";
import PaymentsTable from "./_components/table";

interface SearchParams {
  search?: string;
  status?: string;
  timeRange?: string;
  date?: string;
  page?: string;
}

interface Props {
  searchParams: Promise<SearchParams>; // ← Promise
}

export default async function OperationsPage({ searchParams }: Props) {
  const { search, status, timeRange, date, page } = await searchParams; // ← await

  return (
    <section className="space-y-8">
      <PaymentsFilters
        currentStatus={status}
        currentTimeRange={timeRange}
        currentDate={date}
      />
      <PaymentsTable
        search={search}
        status={status}
        timeRange={timeRange}
        date={date}
        page={page ? Number(page) : 1}
      />
    </section>
  );
}
