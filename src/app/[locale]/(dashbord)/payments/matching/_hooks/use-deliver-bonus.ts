// _hooks/use-deliver-bonus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deliverSingleBonusAction,
  deliverBulkBonusAction,
} from "../_actions/deliver-bonus-action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// ─── Single ───────────────────────────────────────────
export function useDeliverSingleBonus(driverId: string) {
  const t = useTranslations("PaymentsPage.matching.deliverModal");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      orderId: string;
      invoice_picture: File;
      amount: string;
      note: string;
    }) => deliverSingleBonusAction(data),
    onSuccess: () => {
      toast.success(t("toast.success"));
      queryClient.invalidateQueries({ queryKey: ["driver-orders", driverId] });
    },
    onError: () => {
      toast.error(t("toast.error"));
    },
  });
}

// ─── Bulk ─────────────────────────────────────────────
export function useDeliverBulkBonus(driverId: string) {
  const t = useTranslations("PaymentsPage.matching.deliverModal");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      orderIds: string[];
      invoice_picture: File;
      amount: string;
      note: string;
    }) => deliverBulkBonusAction(data),
    onSuccess: () => {
      toast.success(t("toast.success"));
      queryClient.invalidateQueries({ queryKey: ["driver-orders", driverId] });
    },
    onError: () => {
      toast.error(t("toast.error"));
    },
  });
}
