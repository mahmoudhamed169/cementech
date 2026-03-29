"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useSendNotificationForm } from "./_hooks/use-send-notification-form";
import { useSendNotification } from "./_hooks/use-send-notification";
import RecipientSelector from "./_components/recipient-selector";
import NotificationFormFields from "./_components/notification-form-fields";
import ModalActions from "./_components/modal-actions";

interface SendNotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SendNotificationModal({
  open,
  onOpenChange,
}: SendNotificationModalProps) {
  const t = useTranslations("NotificationPage.sendModal");
  const { form, showSearch } = useSendNotificationForm();
  const { mutate, isPending } = useSendNotification();

  function handleSubmit(values: Parameters<typeof mutate>[0]) {
    mutate(values, {
      onSuccess: () => handleClose(),
    });
  }

  function handleClose() {
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl bg-white border-0 max-h-[80vh] overflow-y-auto ">
        {" "}
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="space-y-5 pt-2 ">
            <RecipientSelector
              value={form.watch("recipient")}
              onChange={(val) => form.setValue("recipient", val)}
            />
            <NotificationFormFields form={form} showSearch={showSearch} />
            <ModalActions
              onSubmit={form.handleSubmit(handleSubmit)}
              onCancel={handleClose}
              isPending={isPending}
            />
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
