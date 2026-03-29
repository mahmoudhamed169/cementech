import { Table } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import DriversTableHeader from "./drivers-table-header";
import DriversTableWrapper from "./drivers-table-wrapper";
import { Suspense } from "react";
import TableLoading from "@/src/components/shared/table-loading";

type DriverStatus = "free" | "offline" | "pending" | "blocked";
type LoadingStatus = "loaded" | "not loaded" | "pending";

interface DriversTableProps {
  page?: number;
  limit?: number;
  search?: string;
  driverStatus?: DriverStatus; // ✅
  loadingStatus?: LoadingStatus; // ✅
}

export default function DriversTable({
  page,
  limit,
  search,
  driverStatus,
  loadingStatus,
}: DriversTableProps) {
  const t = useTranslations("driverPage.driversTable");
  return (
    <Table>
      <DriversTableHeader />
      <Suspense fallback={<TableLoading colSpan={9} />}>
        <DriversTableWrapper
          page={page}
          limit={limit}
          search={search}
          driverStatus={driverStatus}
          loadingStatus={loadingStatus}
        />{" "}
        {/* ✅ */}
      </Suspense>
    </Table>
  );
}
