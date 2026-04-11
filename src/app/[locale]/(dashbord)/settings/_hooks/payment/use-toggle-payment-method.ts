import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { togglePaymentMethod } from "../../_actions/payment/toggle-payment-method";

export function useTogglePaymentMethod() {
  const queryClient = useQueryClient();
  const t = useTranslations("settingsPage.tabs.payment.toast");

  return useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) =>
      togglePaymentMethod(id, is_active),
    onSuccess: (_, { is_active }) => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      if (is_active) {
        toast.success(t("activated"));
      } else {
        toast.warning(t("deactivated"));
      }
    },
    onError: () => {
      toast.error(t("error"));
    },
  });
}
