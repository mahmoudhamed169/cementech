import InvoicesListHeader from "./invoices-list-header";
import InvoicesTable from "./invoices-table";

type InvoicesListProps = {
  page: number;
  search?: string;
  invoiceType: string;
};

export default function InvoicesList({
  page,
  search,
  invoiceType,
}: InvoicesListProps) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      <InvoicesListHeader />
      <div className="flex-1 mt-4">
        <InvoicesTable page={page} search={search} invoiceType={invoiceType} />
      </div>
    </section>
  );
}
