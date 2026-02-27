import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EllipsisVertical } from "lucide-react";

import { Order } from "@/src/lib/types/orders/order";
import OrderStatusCell from "../order-status-cell";
import CustomerInfoSection from "./_components/customer-info-section";
import DriverInfoSection from "./_components/driver-info-section";
import OrderLocationSection from "./_components/order-location-section";
import OrderInfoCards from "./_components/order-info-cards";
import OrderCancelButton from "./_components/order-cancel-button";
import OrderDialogTitle from "./_components/order-dialog-title";

export function OrderActions({ order }: { order: Order }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-6 h-6 bg-[#5E5C5C] p-0.5 flex justify-center items-center rounded-lg cursor-pointer">
            <EllipsisVertical className="stroke-white w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-3xl bg-white border-0">
          <OrderDialogTitle orderCode={order.code} />
          <div className="p-6 border-t-[0.8px] border-[#E5E7EB] space-y-6">
            {/* حالة الطلب */}
            <OrderStatusCell status={order.order_status} />

            {/* معلومات العميل */}
            <CustomerInfoSection order={order} />

            {/* معلومات السائق */}
            <DriverInfoSection order={order} />

            {/* تفاصيل الإستلام */}
            <OrderLocationSection order={order} />

            <OrderInfoCards order={order} />
          </div>
          <DialogFooter className="p-6 border-t-[0.8px] border-[#E5E7EB]">
            <OrderCancelButton />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
