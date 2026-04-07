"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { markNotificationAsReadAction } from "../_actions/_action";

export function useMarkAsRead() {
  const t = useTranslations("NotificationPage.markAsRead");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsReadAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(t("toast.success"));
    },
    onError: () => {
      toast.error(t("toast.error"));
    },
  });
}
