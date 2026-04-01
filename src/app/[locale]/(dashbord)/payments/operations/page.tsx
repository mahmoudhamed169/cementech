import { PaymentsFilters } from "./_components/payments-filters";
import PaymentsTable from "./_components/table";

interface SearchParams {
  search?: string;
  status?: string;
  timeRange?: string;
}

interface Props {
  searchParams: SearchParams;
}

export default async function OperationsPage({ searchParams }: Props) {
  return (
    <section className="space-y-8">
      <PaymentsFilters
        currentStatus={searchParams.status}
        currentTimeRange={searchParams.timeRange}
      />
      {/* <PaymentsTable  */}
      <PaymentsTable />
    </section>
  );
}
