

import { RevenueReportCard } from "./_components/revenue-report-card";
import { CommissionReportCard } from "./_components/commission-report-card";
import { CustomReportForm } from "./_components/custom-report-form";
import { getOrdersReport } from "@/src/lib/services/payments/get-orders-report";

export default async function ReportsPage() {
  // جلب الداتا في السيرفر
  const report = await getOrdersReport();

  return (
    <section className="space-y-6 p-6">
      <div className="grid grid-cols-2 gap-4">
        {/* تمرير الداتا لكل كارد */}
        <RevenueReportCard data={report.data.revenue_metrics} />
        <CommissionReportCard data={report.data.platform_fee_metrics} />
      </div>
      <CustomReportForm />
    </section>
  );
}