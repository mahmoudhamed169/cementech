import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeliveryStatusBadge } from "@/src/app/[locale]/(dashbord)/_components/deliver-status-badge";
import { Order } from "@/src/lib/constants/order";
import { CircleX, EllipsisVertical } from "lucide-react";
import InfoSection from "./info-section";
import UnassignedDriverState from "./unassigned-driver-state";
import OrderLocationDetails from "./order-location-details";
import { InfoCard } from "./info-card";
import TimeAgo from "../providers/shared/_components/time-ago";
import { CurrencyIcon } from "./currency-icon";

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
              الطلب رقم - {order.id}# + (الفاتورة)
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 border-t-[0.8px] border-[#E5E7EB] space-y-6">
            {/* حالة الطلب */}
            <div className="bg-[#F9FAFB] rounded-xl min-h-17 p-4 flex justify-between items-center">
              <h6 className="text-[#364153]"> حالة الطلب :</h6>
              <DeliveryStatusBadge status="delivering" />
            </div>

            {/* معلومات العميل */}
            <InfoSection
              title="معلومات العميل"
              items={[
                { label: "الإسم", value: order.customer.name },
                { label: "الجوال", value: order.customer.phone },
              ]}
            />

            {/* معلومات السائق */}
            {order.driver ? (
              <InfoSection
                title="معلومات السائق + (حوار الشحنات)"
                items={[
                  { label: "الإسم", value: order.driver?.name },
                  { label: "الجوال", value: order.driver?.phone },
                ]}
                trackingUrl={order.driver?.trackingUrl}
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
                  address: order.deliveryLocation,
                  iconColor: "#00A63E",
                  iconBgColor: "#DCFCE7",
                },
                {
                  title: "موقع تحميل الاسمنت",
                  address: order.pickupLocation,
                  iconColor: "#155DFC",
                  iconBgColor: "#DBEAFE",
                },
              ]}
            />

            <div className="flex gap-3 mt-4 w-full">
              <InfoCard label="كمية الأسمنت" value={`${order.quantity} طن`} />
              <InfoCard
                label="السعر"
                value={order.price}
                icon={<CurrencyIcon />}
              />
              <InfoCard
                label="آخر تحديث"
                value={<TimeAgo time={order.time} />}
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
