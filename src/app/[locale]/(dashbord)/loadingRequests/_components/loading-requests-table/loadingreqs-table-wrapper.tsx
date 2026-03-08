import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { getRequests } from "@/src/lib/services/loading-requests/getRequests";

import { cookies } from "next/headers";
import LoadingRequestsTableBody from "./loading-req-body-table";

export default async function LoadingReqsTableWrapper() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "ar";

  const data = await getRequests({ page: 1, limit: 10 }, locale as "ar" | "en");
  console.log(data);

  return (
    <>
      <LoadingRequestsTableBody loadingRequests={data.data} />;
      {data.data.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                <PaginationInfo
                  from={(data.meta.page - 1) * data.meta.limit + 1}
                  to={Math.min(
                    data.meta.page * data.meta.limit,
                    data.meta.itemCount,
                  )}
                  total={data.meta.itemCount}
                  type="loadingRequests"
                />
              </TableCell>
            </TableRow>
            <TableCell className="text-center" colSpan={9}>
              <DynamicPagination
                totalPages={data.meta.pageCount}
                currentPage={data.meta.page}
              />
            </TableCell>
          </TableFooter>
        </>
      )}
    </>
  );
}
