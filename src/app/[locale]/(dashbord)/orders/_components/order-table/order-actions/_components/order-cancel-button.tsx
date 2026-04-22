"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CircleX, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCancelOrder } from "../../../../_hooks/use-cancel-order";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function OrderCancelButton({ id }: { id: string }) {
  const t = useTranslations("orderActions");
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  const handleCancel = () => {
    cancelOrder(id, {
      onSuccess: () => toast.success(t("cancelSuccess")),
      onError: () => toast.error(t("cancelError")),
    });
  };

  const can = usePermissionsStore((s) => s.can);
  if (!can("order_permission", "PATCH")) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          variant="outline"
          className="h-11 px-10 text-base border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 gap-2 disabled:opacity-50"
        >
          <CircleX className="w-5 h-5" />
          {isPending ? t("canceling") : t("cancelOrder")}
        </Button>
      </AlertDialogTrigger>

<AlertDialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden shadow-xl border-0 bg-white">        <div className="bg-white px-8 pt-8 pb-6 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <TriangleAlert className="w-8 h-8 text-red-500" />
          </div>
          <AlertDialogHeader className="space-y-2 items-center">
            <AlertDialogTitle className="text-xl font-bold text-gray-900 text-center">
              {t("cancelConfirmTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 text-center leading-relaxed">
              {t("cancelConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="px-8 py-5 bg-white flex gap-3 flex-row-reverse sm:flex-row-reverse !border-t-0">
          <AlertDialogAction
            onClick={handleCancel}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 font-semibold transition-colors shadow-sm"
          >
            {t("cancelOrder")}
          </AlertDialogAction>
          <AlertDialogCancel className="flex-1 rounded-xl h-11 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors">
            {t("cancelConfirmBack")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}