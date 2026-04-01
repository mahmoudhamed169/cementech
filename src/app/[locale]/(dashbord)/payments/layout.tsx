// payments/layout.tsx
import { ReactNode } from "react";
import { PageHeader } from "./_components/page-header";
import { StatsRow } from "./_components/stats-row";
import { PaymentsNav } from "./_components/payments-nav-link";

export default function PaymentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pt-12 pb-5 px-6 space-y-6">
      <PageHeader />
      <StatsRow />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
        {" "}
        <PaymentsNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
