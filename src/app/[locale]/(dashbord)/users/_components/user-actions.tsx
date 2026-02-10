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

import { EllipsisVertical } from "lucide-react";
import BasicInfo from "./user-basic-info";
import UserStats from "./user-stats";
import { User } from "@/src/lib/constants/user";
import { getTotalPaid } from "@/src/lib/utils/utils";
import UserOrders from "./user-order";

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
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
