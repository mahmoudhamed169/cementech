import LoadingRequestsTable from "./loading-requests-table/loading-requests-table";
import LoadingReqHeader from "./loading-req-list-header";

export default function LoadingReqList({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    time?: string;
    type?: string;
  };
}) {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      <LoadingReqHeader />
      <div className="flex-1 mt-4">
        <LoadingRequestsTable searchParams={searchParams} />
      </div>
    </section>
  );
}
