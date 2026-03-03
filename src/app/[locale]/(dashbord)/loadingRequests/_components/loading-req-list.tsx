import SearchInput from "@/src/components/shared/search-input";

import LoadingRequestsTable from "./loading-requests-table/loading-requests-table";
import LoadingReqHeader from "./loading-req-list-header";

export default function LoadingReqList() {
  return (
    <section className="bg-white min-h-132.5 border border-[#E5E7EB] rounded-xl p-6 flex flex-col">
      {/* Header */}
      <LoadingReqHeader />

      {/* users table */}
      <div className="flex-1 mt-4">
        {/* هنا الجدول */}
        <LoadingRequestsTable />
      </div>
    </section>
  );
}
