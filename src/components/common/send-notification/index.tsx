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

interface Props extends SendNotificationProps {
  open?: boolean; // optional - لو مش موجود هيشتغل بالـ trigger
  onClose?: () => void; // optional - لو مش موجود هيتحكم في نفسه
}

export default function SendNotification({
  recipientId,
  recipientName,
  recipientType,
  open: controlledOpen,
  onClose: controlledOnClose,
}: Props) {
  const t = useTranslations("SendNotification");
  const [internalOpen, setInternalOpen] = useState(false);

  // لو في controlled props نستخدمهم، لو لأ نستخدم الـ internal state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const form = useSendNotificationForm();
  const { mutate, isPending } = useSendNotification(recipientId);

  function handleSubmit(values: Parameters<typeof mutate>[0]) {
    mutate(values, {
      onSuccess: () => handleClose(),
    });
  }

  function handleClose() {
    form.reset();
    if (isControlled) {
      controlledOnClose?.();
    } else {
      setInternalOpen(false);
    }
  }

  return (
    <>
      {/* الـ trigger بيظهر بس لو مش controlled */}
      {!isControlled && (
        <Button
          variant="outline"
          className="w-full rounded-2xl h-12 gap-2 text-gray-700 border-[#D1D5DC] hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] transition-all"
          onClick={() => setInternalOpen(true)}
        >
          <Bell className="h-4 w-4" />
          {t("trigger")}
        </Button>
      )}

      {/* modal */}
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
