import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";
import { getFactories } from "@/src/lib/services/factories/factories";
import { cookies } from "next/headers";
import FactoriesTableBody from "./factories-table-body";

export default async function FacotoriesTableWrapper() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  const factories = await getFactories(locale);

  return (
    <>
      <FactoriesTableBody factories={factories.data} />
      {factories.data.length > 0 && (
        <>
          <TableFooter>
            <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
              <TableCell colSpan={9}>
                <PaginationInfo
                  from={(factories.meta.page - 1) * factories.meta.limit + 1}
                  to={Math.min(
                    factories.meta.page * factories.meta.limit,
                    factories.meta.itemCount,
                  )}
                  total={factories.meta.itemCount}
                  type="loadingRequests"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center" colSpan={9}>
                <DynamicPagination
                  totalPages={factories.meta.pageCount}
                  currentPage={factories.meta.page}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </>
      )}
    </>
  );
}
