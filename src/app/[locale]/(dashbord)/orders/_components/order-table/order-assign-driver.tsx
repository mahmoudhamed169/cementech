"use client";

import { Button } from "@/components/ui/button";
import { AssigneDriver } from "@/src/components/shared/assigne-driver-dialog";
import { UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";

interface OrderAssignDriverProps {
  hasDrivers: boolean;
  truckQuantity: number;
  orderCode: string;
  orderId: string;
}

export default function OrderAssignDriver({
  hasDrivers,
  truckQuantity,
  orderCode,
  orderId,
}: OrderAssignDriverProps) {
  const t = useTranslations("recentOrders");

  if (hasDrivers)
    return <div className="w-5 h-5 flex items-center justify-center"></div>;

  return (
    <div className="w-5 h-5 flex items-center justify-center">
      <div title={t("driverStatus.notAssigned")}>
        <AssigneDriver
          numOfShipments={truckQuantity}
          orderCode={orderCode}
          orderId={orderId}
        >
          <Button>
            <UserRoundPlus className="stroke-[#FB2C36]" size={24} />
          </Button>
        </AssigneDriver>
      </div>
    </div>
  );
}
