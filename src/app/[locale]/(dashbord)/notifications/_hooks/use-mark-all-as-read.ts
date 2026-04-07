"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { markAllNotificationsAsReadAction } from "../_actions/_action";

export function useMarkAllAsRead() {
  const t = useTranslations("NotificationPage.markAllAsRead");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsAsReadAction(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(t("toast.success"));
    },
    onError: () => {
      toast.error(t("toast.error"));
    },
  });
}
