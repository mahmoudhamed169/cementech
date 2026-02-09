import { Button } from "@/components/ui/button";
import { Order } from "@/src/lib/constants/order";
import { UserPlus } from "lucide-react";
import { AssigneDriver } from "./assigne-driver-dialog";

export default function UnassignedDriverState({ order }: { order: Order }) {
  return (
    <div>
      <h2 className="text-[#101828] font-bold text-xl">معلومات السائق</h2>
      <div className="mt-2.5  rounded-xl min-h-17 p-4 flex justify-between items-center bg-[#FEFCE8]">
        <h6 className="text-[#894B00]"> غير مخصص لسائق</h6>

        <AssigneDriver numOfShipments={order.shipments} orderId={order.id}>
          <Button className="min-w-32.25 min-h-10.5 bg-[#D08700] rounded-xl p-2.5 text-white">
            <UserPlus />
            تخصيص لسائق
          </Button>
        </AssigneDriver>
      </div>
    </div>
  );
}
