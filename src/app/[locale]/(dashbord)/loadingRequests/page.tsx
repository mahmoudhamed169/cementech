import LoadingReqList from "./_components/loading-req-list";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string; time?: string }>;
}) {
  const params = await searchParams;
  return <LoadingReqList searchParams={params} />;
}