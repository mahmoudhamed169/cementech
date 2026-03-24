"use client";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";

import { toast } from "sonner";
import { useCancelOrder } from "../../../../_hooks/use-cancel-order";

export default function OrderCancelButton({ id }: { id: string }) {
  const t = useTranslations("orderActions");
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  const handleCancel = () => {
    cancelOrder(id, {
      onSuccess: () => {
        toast.success(t("cancelSuccess"));
      },
      onError: () => {
        toast.error(t("cancelError"));
      },
    });
  };

  return (
    <Button
      onClick={handleCancel}
      disabled={isPending}
      variant="outline"
      className="w-full bg-[#E7000B] border-0 text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-600 disabled:opacity-60"
    >
      <CircleX className="w-5 h-5" />
      {isPending ? t("canceling") : t("cancelOrder")}
    </Button>
  );
}
