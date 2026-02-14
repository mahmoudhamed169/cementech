import InvoicesHeader from "./_components/invoices-header";
import InvoicesList from "./_components/invoices-list";

export default function page() {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <InvoicesHeader />
      <InvoicesList  />
    </main>
  );
}
