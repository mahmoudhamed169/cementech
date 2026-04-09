import SupervisorsTable from "./table/supervisors-table";
import SupervisorsHeaderList from "./supervisors-header-list";

interface Props {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  };
}

export default function SupervisorsList({ searchParams }: Props) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 space-y-4">
      <SupervisorsHeaderList />

      <div className="flex-1 mt-4">
        <SupervisorsTable searchParams={searchParams} />
      </div>
    </section>
  );
}
