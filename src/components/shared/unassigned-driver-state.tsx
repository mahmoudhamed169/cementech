"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { AssigneDriver } from "./assigne-driver-dialog";
import { Order } from "@/src/lib/types/orders/order";
import { useTranslations } from "next-intl";
import { OrderData } from "@/src/lib/services/orders/spacific-order";

interface UnassignedDriverStateProps {
  order: Order;
}

export default function UnassignedDriverState({
  order,
}: UnassignedDriverStateProps) {
  const t = useTranslations("orderActions");

  return (
    <div>
      <h2 className="text-[#101828] font-bold text-xl">{t("driverInfo")}</h2>
      <div className="mt-2.5 rounded-xl min-h-[68px] p-4 flex justify-between items-center bg-[#FEFCE8]">
        <h6 className="text-[#894B00]">{t("notAssigned")}</h6>

        <AssigneDriver
          numOfShipments={order.truck_quantity}
          orderId={order.id}
          orderCode={order.code}
        >
          <Button className="min-w-[130px] min-h-[42px] bg-[#D08700] rounded-xl p-2.5 text-white flex items-center gap-2">
            <UserPlus />
            {t("assignDriver")}
          </Button>
        </AssigneDriver>
      </div>
    </div>
  );
}
