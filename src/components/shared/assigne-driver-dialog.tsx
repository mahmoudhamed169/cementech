"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck, UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";

interface Driver {
  id: string;
  name: string;
  distance: string;
}

const drivers: Driver[] = [
  { id: "DRV001", name: "أحمد علي", distance: "1.2 ك" },
  { id: "DRV002", name: "محمود الشناوي", distance: "2.5 ك" },
  { id: "DRV003", name: "سارة محمد", distance: "3.1 ك" },
];

export function AssigneDriver({
  orderId,
  numOfShipments,
  children,
}: {
  orderId: string;
  numOfShipments: number;
  children: React.ReactNode;
}) {
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const t = useTranslations("recentOrders");

  const handleSelect = (driverId: string) => {
    if (numOfShipments === 1) {
      setSelectedDrivers([driverId]);
    } else {
      if (selectedDrivers.includes(driverId)) {
        setSelectedDrivers(selectedDrivers.filter((id) => id !== driverId));
      } else if (selectedDrivers.length < numOfShipments) {
        setSelectedDrivers([...selectedDrivers, driverId]);
      }
    }
  };

  const isValidSelection =
    numOfShipments === 1
      ? selectedDrivers.length === 1
      : selectedDrivers.length === numOfShipments;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-xl bg-white border-0 p-0">
        <DialogHeader className="p-6">
          <DialogTitle className="text-[#101828] font-bold text-2xl">
            تخصيص سائق للطلب رقم {orderId}# ({numOfShipments}{" "}
            {numOfShipments === 1
              ? t("shipmentLabel.one")
              : t("shipmentLabel.many")}
            )
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-85 border-y border-[#E5E7EB] p-6 space-y-4 max-h-100 overflow-y-auto">
          <h6 className="text-[#4A5565] mb-2">
            سائقين متاحين بالقرب من الموقع
          </h6>

          {drivers.map((driver) => {
            const isSelected = selectedDrivers.includes(driver.id);
            return (
              <div
                key={driver.id}
                onClick={() => handleSelect(driver.id)}
                className={`
                  min-h-19.25 p-4 border rounded-lg bg-white flex justify-between items-center cursor-pointer
                  ${
                    isSelected
                      ? " text-white border-[#155DFC]"
                      : " hover:bg-[#DBEAFE] border-[#E5E7EB]"
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  {isSelected && <CircleCheck className=" stroke-indigo-500" />}
                  <div>
                    <h6 className="font-semibold text-[#101828]">
                      {driver.name}
                    </h6>
                    <span className={`text-sm text-[#6A7282]`}>
                      ID: {driver.id}
                    </span>
                  </div>
                </div>
                <h6 className=" text-[#101828]">على بعد {driver.distance}</h6>
              </div>
            );
          })}
        </div>

        <DialogFooter className="p-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={!isValidSelection}
              className={`
        w-full border-0 text-white flex items-center justify-center gap-2
        transition-all
        ${
          isValidSelection
            ? "bg-[#155DFC] hover:opacity-90 active:scale-95 focus:ring-[#155DFC]"
            : "bg-[#C0C0C0] opacity-60 cursor-not-allowed"
        }
        focus:outline-none focus:ring-2 focus:ring-offset-1
      `}
            >
              تاكيد
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
