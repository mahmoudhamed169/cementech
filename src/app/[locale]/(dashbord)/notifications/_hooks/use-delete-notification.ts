"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { deleteNotificationAction } from "../_actions/_action";

export function useDeleteNotification() {
  const t = useTranslations("NotificationPage.delete");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNotificationAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(t("toast.success"));
    },
    onError: () => {
      toast.error(t("toast.error"));
    },
  });
}
