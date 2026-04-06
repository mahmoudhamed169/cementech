import InvoicesList from "./_components/invoices-list";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    invoice_type?: string;
  }>;
};

export default async function InvoicesPage({ searchParams }: PageProps) {
  const { page, search, invoice_type } = await searchParams;

  return (
    <InvoicesList
      page={Number(page) || 1}
      search={search}
      invoiceType={invoice_type ?? "orders"}
    />
  );
}
