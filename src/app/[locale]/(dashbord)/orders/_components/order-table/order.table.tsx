import { Table } from "@/components/ui/table";
import OrdersTableHeader from "./orders-table-header";
import { Suspense } from "react";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import OrdersTableWrapper from "./orders-table-wrapper";

export default function OrderTable({ limit }: { limit?: number }) {
  return (
    <Table>
      {/* header */}
      <OrdersTableHeader />

      {/* body */}
      <Suspense fallback={<TableLoadingSpinner colSpan={10} />}>
        <OrdersTableWrapper limit={limit} />
      </Suspense>
    </Table>
  );
}
