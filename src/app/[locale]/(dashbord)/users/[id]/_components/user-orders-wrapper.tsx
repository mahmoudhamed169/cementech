import { fetchUserOrders } from "@/src/lib/services/users/user-orders";
import UserOrdersBody from "./user-orders-body";
import UserOrdersEmpty from "./user-orders-empty";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { DynamicPagination } from "@/src/components/shared/pagination";
import PaginationInfo from "@/src/components/shared/pagination-info";

interface IProps {
  userId: string;
  page?: number;
  systemScreen?: "user_permission" | "driver_permission"; // ✅
}

const LIMIT = 5;

export default async function UserOrdersWrapper({
  userId,
  page = 1,
  systemScreen = "user_permission", // ✅ default للـ users
}: IProps) {
  const { data: orders, meta } = await fetchUserOrders({
    id: userId,
    page,
    limit: LIMIT,
    systemScreen, // ✅
  });

  if (orders.length === 0) return <UserOrdersEmpty />;

  return (
    <>
      <UserOrdersBody orders={orders} />
      <TableFooter>
        <TableRow className="border-t border-b-0 border-[#E5E7EB] h-14 text-start">
          <TableCell colSpan={6}>
            <PaginationInfo
              from={(meta.page - 1) * LIMIT + 1}
              to={Math.min(meta.page * LIMIT, meta.itemCount)}
              total={meta.itemCount}
              type="orders"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-center" colSpan={6}>
            <DynamicPagination
              totalPages={meta.pageCount}
              currentPage={meta.page}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
}
