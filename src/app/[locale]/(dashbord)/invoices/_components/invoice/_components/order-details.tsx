import OrderDetailsTable from "./order-details-table";
import {
  OrderDetails as OrderDetailsType,
  Product,
} from "@/src/lib/types/invoices/invoice-details";

export default function OrderDetails({
  order,
  product,
  fact
}: {
  order: OrderDetailsType;
  product: Product;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-[#0A0A0A] text-xl">تفاصيل الطلب</h2>
      <OrderDetailsTable order={order} product={product} />
    </div>
  );
}
