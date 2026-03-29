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
import { CircleCheck, Loader2, CarFront } from "lucide-react";
import { useTranslations } from "next-intl";
import { useNearbyDrivers } from "@/src/lib/hooks/useNearbyDrivers";
import { useAssignDriver } from "@/src/lib/hooks/use-assign-driver";

export function AssigneDriver({
  orderCode,
  orderId,
  numOfShipments,
  productId,
  quantity,
  children,
}: {
  orderCode: string;
  orderId: string;
  numOfShipments: number;
  productId: string;
  quantity: number;
  children: React.ReactNode;
}) {
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const t = useTranslations("orderActions");
  const { mutate: assignDriver, isPending } = useAssignDriver(orderId);

  const handleConfirm = () => {
    assignDriver(selectedDrivers, {
      onSuccess: () => {
        setOpen(false);
        setSelectedDrivers([]);
      },
    });
  };

  const {
    data: drivers = [],
    isLoading,
    isError,
  } = useNearbyDrivers(open ? productId : "", quantity, orderId);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-xl bg-white border-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-[#101828] font-bold text-2xl">
            {t("assignDriverToOrder")} {orderCode}# ({numOfShipments}{" "}
            {numOfShipments === 1
              ? t("shipmentLabel.one")
              : t("shipmentLabel.many")}
            )
          </DialogTitle>
        </DialogHeader>

        <div className="border-y border-[#E5E7EB] px-6 py-4 space-y-3 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin text-[#155DFC]" size={28} />
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                <CarFront className="text-red-400" size={20} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#101828] text-base">
                  {t("errorLoadingDrivers")}
                </p>
                <p className="text-sm text-[#6A7282] mt-0.5">
                  {t("errorLoadingDriversDesc")}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && drivers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="w-11 h-11 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                <CarFront className="text-[#9CA3AF]" size={20} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#101828] text-base">
                  {t("noDriversAvailable")}
                </p>
                <p className="text-sm text-[#6A7282] mt-0.5">
                  {t("noDriversAvailableDesc")}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && drivers.length > 0 && (
            <>
              <h6 className="text-[#4A5565] text-base font-medium">
                {t("availableDrivers")}
              </h6>
              {drivers.map((driver) => {
                const isSelected = selectedDrivers.includes(driver.id);
                return (
                  <div
                    key={driver.id}
                    onClick={() => handleSelect(driver.id)}
                    className={`
                      p-4 border rounded-lg bg-white flex justify-between items-center cursor-pointer transition-colors
                      ${isSelected ? "border-[#155DFC] bg-[#EFF6FF]" : "hover:bg-[#DBEAFE] border-[#E5E7EB]"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isSelected && (
                        <CircleCheck className="stroke-indigo-500 shrink-0" />
                      )}
                      <div>
                        <h6 className="font-semibold text-[#101828] text-base">
                          {driver.driver_name}
                        </h6>
                        <span className="text-sm text-[#6A7282]">
                          {t("driverId")}: {driver.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-[#6A7282]">
                          {t("quantity")}
                        </span>
                        <span className="text-base font-medium text-[#101828]">
                          {driver.quantity}
                        </span>
                      </div>

                      {driver.distance != null && (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-[#6A7282]">
                            {t("distance")}
                          </span>
                          <span className="text-base font-medium text-[#101828]">
                            {driver.distance} ك
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <DialogFooter className="px-6 py-4">
          <Button
            onClick={handleConfirm}
            disabled={!isValidSelection || isPending}
            className={`
            w-full border-0 text-white text-base flex items-center justify-center gap-2
            transition-all
            ${
              isValidSelection && !isPending
                ? "bg-[#155DFC] hover:opacity-90 active:scale-95"
                : "bg-[#C0C0C0] opacity-60 cursor-not-allowed"
            }
          `}
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              t("confirm")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
