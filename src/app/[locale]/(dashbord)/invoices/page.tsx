import InvoicesList from "./_components/invoices-list";

type PageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function InvoicesPage({ searchParams }: PageProps) {
  const { page, search } = await searchParams;

  return <InvoicesList page={Number(page) || 1} search={search} />;
}
