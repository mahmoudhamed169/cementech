"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { SendNotificationProps } from "./_types";
import { useSendNotificationForm } from "./_hooks/use-send-notification-form";
import { useSendNotification } from "./_hooks/use-send-notification";
import SendNotificationForm from "./_components/notification-form-fields";

export default function SendNotification({
  recipientId,
  recipientName,
  recipientType,
}: SendNotificationProps) {
  const t = useTranslations("SendNotification");
  const [open, setOpen] = useState(false);

  const form = useSendNotificationForm();
  const { mutate, isPending } = useSendNotification(recipientId);

  function handleSubmit(values: Parameters<typeof mutate>[0]) {
    mutate(values, {
      onSuccess: () => handleClose(),
    });
  }

  function handleClose() {
    form.reset();
    setOpen(false);
  }

  return (
    <>
      {/* ─── trigger ─── */}
      <Button
        variant="outline"
        className="w-full rounded-2xl h-12 gap-2 text-gray-700 border-[#D1D5DC] hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] transition-all"
        onClick={() => setOpen(true)}
      >
        <Bell className="h-4 w-4" />
        {t("trigger")}
      </Button>

      {/* ─── modal ─── */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white border-0">
          <DialogHeader>
            <DialogTitle>{t("modal.title")}</DialogTitle>
            <DialogDescription>
              {t("modal.description", {
                recipientType: t(`modal.recipientType.${recipientType}`),
                recipientName,
              })}
            </DialogDescription>
          </DialogHeader>

          <SendNotificationForm form={form} />

          {/* actions */}
          <div className="flex gap-3 pt-1">
            <Button
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition-all"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isPending}
            >
              {isPending ? t("modal.sending") : t("modal.send")}
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-[#D1D5DC] hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all"
              onClick={handleClose}
              disabled={isPending}
            >
              {t("modal.cancel")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
