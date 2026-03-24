"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";

import OrderStatusCell from "./_components/order-status-cell";
import CustomerInfoSection from "./_components/customer-info-section";
import DriverInfoSection from "./_components/driver-info-section";
import OrderLocationSection from "./_components/order-location-section";
import OrderInfoCards from "./_components/order-info-cards";
import OrderCancelButton from "./_components/order-cancel-button";
import OrderDialogTitle from "./_components/order-dialog-title";
import { OrderData } from "@/src/lib/services/orders/spacific-order";
import OrderModelStatusCell from "./_components/order-status-cell";

interface OrderActionsProps {
  order: OrderData;
}

export default function OrderActions({ order }: OrderActionsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-6 h-6 bg-[#5E5C5C] p-0.5 flex justify-center items-center rounded-lg cursor-pointer"
        >
          <EllipsisVertical className="stroke-white w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-3xl bg-white border-0">
        <OrderDialogTitle orderCode={order.code} />
        <div className="p-6 border-t-[0.8px] border-[#E5E7EB] space-y-6">
          <OrderModelStatusCell status={order.order_status} />
          <CustomerInfoSection order={order} />
          <DriverInfoSection order={order} />
          <OrderLocationSection order={order} />
          <OrderInfoCards order={order} />
        </div>
        <DialogFooter className="p-6 border-t-[0.8px] border-[#E5E7EB]">
          {order.order_status !== "canceled" && (
           
              <OrderCancelButton id={order.id} />
          
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
