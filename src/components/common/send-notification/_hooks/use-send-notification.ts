import { useMutation } from "@tanstack/react-query";
import { sendNotificationAction } from "../_action";
import { SendNotificationSchema } from "../_schema";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useSendNotification(recipientId: string) {
  const t = useTranslations("SendNotification");

  return useMutation({
    mutationFn: (data: SendNotificationSchema) =>
      sendNotificationAction({ ...data, user_id: recipientId }),

    onSuccess: () => {
      toast.success(t("toast.success"));
    },
    onError: () => {
      toast.error(t("toast.error"));
    },
  });
}
