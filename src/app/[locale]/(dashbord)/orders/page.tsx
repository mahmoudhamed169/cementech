import OrdersList from "./_components/orders-list";

type OrderStatus =
  | "all"
  | "under_review"
  | "approved"
  | "rejected"
  | "delivery";
type OrderTime = "today" | "this_week" | "this_month" | "all";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: OrderStatus;
    time?: OrderTime;
  }>;
}

export default async function OrderPage({ searchParams }: PageProps) {
  const { page, search, status, time } = await searchParams;

  return (
    <OrdersList
      page={page ? Number(page) : 1}
      search={search}
      status={status}
      time={time}
    />
  );
}
