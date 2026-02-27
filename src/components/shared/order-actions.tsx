import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeliveryStatusBadge } from "@/src/app/[locale]/(dashbord)/_components/deliver-status-badge";

import { CircleX, EllipsisVertical } from "lucide-react";
import InfoSection from "./info-section";
import UnassignedDriverState from "./unassigned-driver-state";
import OrderLocationDetails from "./order-location-details";
import { InfoCard } from "./info-card";
import TimeAgo from "../providers/shared/_components/time-ago";
import { CurrencyIcon } from "./currency-icon";
import { Order } from "@/src/lib/types/orders/order";

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
          <DialogHeader className="p-6">
            <DialogTitle className="text-[#101828] font-bold text-2xl">
              الطلب رقم - {order.code}# + (الفاتورة)
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 border-t-[0.8px] border-[#E5E7EB] space-y-6">
            {/* حالة الطلب */}
            <div className="bg-[#F9FAFB] rounded-xl min-h-17 p-4 flex justify-between items-center">
              <h6 className="text-[#364153]"> حالة الطلب :</h6>
              <DeliveryStatusBadge status={order.order_status} />
            </div>

            {/* معلومات العميل */}
            <InfoSection
              title="معلومات العميل"
              items={[
                {
                  label: "الإسم",
                  value: order.customer_name ? order.customer_name : "-",
                },
                { label: "الجوال", value: order.phone ? order.phone : "-" },
              ]}
            />

            {/* معلومات السائق */}
            {order.has_drivers ? (
              <InfoSection
                title="معلومات السائق + (حوار الشحنات)"
                // هنا هيكون arr of objects كل object فيه label and value
                items={order.drivers.map((driver) => ({
                  label: driver.driver_name,
                  value: driver.code,
                }))}
                // trackingUrl={order.drivers[0].trackingUrl}
              />
            ) : (
              <UnassignedDriverState order={order} />
            )}

            {/* تفاصيل الإستلام */}
            <OrderLocationDetails
              title="تفاصيل الإستلام"
              locations={[
                {
                  title: "موقع توصيل الاسمنت",
                  address: order.address_title,
                  iconColor: "#00A63E",
                  iconBgColor: "#DCFCE7",
                },
                {
                  title: "موقع تحميل الاسمنت",
                  address: order.address_name ? order.address_name : "-",
                  iconColor: "#155DFC",
                  iconBgColor: "#DBEAFE",
                },
              ]}
            />

            <div className="flex gap-3 mt-4 w-full">
              <InfoCard label="المصنع" value={order.factory_name} />

              <InfoCard
                label="كمية الأسمنت"
                value={`${order.truck_quantity} طن`}
              />
              <InfoCard
                label="السعر"
                value={order.total}
                icon={<CurrencyIcon />}
              />
              <InfoCard
                label="آخر تحديث"
                value={<TimeAgo time={order.created_at} />}
              />
            </div>
          </div>
          <DialogFooter className="p-6 border-t-[0.8px] border-[#E5E7EB]">
            <Button
              variant="outline"
              className="w-full bg-[#E7000B] border-0 text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-600"
            >
              <CircleX className="w-5 h-5" />
              الغاء الطلب
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
