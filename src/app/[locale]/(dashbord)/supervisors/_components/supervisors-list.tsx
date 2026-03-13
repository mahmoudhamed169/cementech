import SupervisorsTable from "./table/supervisors-table";
import SupervisorsHeaderList from "./supervisors-header-list";

export default function SupervisorsList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 space-y-4">
      {/* Header */}
      <SupervisorsHeaderList />

      {/* Supervisors table */}
      <div className="flex-1 mt-4">
        <SupervisorsTable />
      </div>
    </section>
  );
}
