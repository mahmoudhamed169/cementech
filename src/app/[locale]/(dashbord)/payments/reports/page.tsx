import { RevenueReportCard } from "./_components/revenue-report-card";
import { CommissionReportCard } from "./_components/commission-report-card";
import { CustomReportForm } from "./_components/custom-report-form";

export default function ReportsPage() {
  return (
    <section className="space-y-6 p-6">
      <div className="grid grid-cols-2 gap-4">
        <RevenueReportCard />
        <CommissionReportCard />
      </div>
      <CustomReportForm />
    </section>
  );
}
