import { Table } from "@/components/ui/table";
import { Suspense } from "react";
import TableLoading from "@/src/components/shared/table-loading";
import UserOrdersTableHeader from "./user-orders-table-header";
import UserOrdersWrapper from "./user-orders-wrapper";

interface IProps {
  userId: string;
  page?: number; // ✅
}

export default function UserOrdersList({ userId, page }: IProps) {
  return (
    <Table>
      <UserOrdersTableHeader />
      <Suspense fallback={<TableLoading colSpan={6} />}>
        <UserOrdersWrapper userId={userId} page={page} />
      </Suspense>
    </Table>
  );
}
