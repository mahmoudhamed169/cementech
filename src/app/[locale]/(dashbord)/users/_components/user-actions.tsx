import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Ban, Bell, EllipsisVertical } from "lucide-react";
import BasicInfo from "./user-basic-info";
import UserStats from "./user-stats";
import { User } from "@/src/lib/constants/user";
import { getTotalPaid } from "@/src/lib/utils/utils";
import UserOrders from "./user-order";
import { SendUserNotification } from "./send-user-notification";

export function UserActions({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-6 h-6 bg-[#5E5C5C] p-0.5 flex justify-center items-center rounded-lg cursor-pointer">
          <EllipsisVertical className="stroke-white w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-3xl bg-white border-0 p-0 py-6">
        <DialogHeader>
          <DialogTitle className="text-[#101828] font-bold text-2xl p-6">
            بيانات المستخدم
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 border-y border-[#E5E7EB] space-y-6 ">
          <BasicInfo
            userId={user.id}
            userName={user.userName}
            userPhoneNumber={user.phoneNumber}
            userStat={user.status}
          />
          <UserStats
            totalOrderCount={user.orders.length}
            totalPaid={getTotalPaid(user)}
          />

          <div className="">
            <UserOrders userOrder={user.orders} />
          </div>
        </div>
        <DialogFooter className="">
          <div className="flex justify-around w-full gap-4">
            {/* Ban User */}
            <Button
              variant="outline"
              className="
      w-87 h-12 bg-red-500 text-white p-2.5 rounded-xl
      flex items-center justify-center gap-2
      transition-all duration-200
      hover:bg-red-600 hover:shadow-lg hover:scale-[1.02]
      active:scale-[0.98]
      focus-visible:ring-2 focus-visible:ring-red-400
    "
            >
              <Ban className="w-5 h-5" />
              حظر المستخدم
            </Button>

            {/* Send Notification */}
            <SendUserNotification />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
