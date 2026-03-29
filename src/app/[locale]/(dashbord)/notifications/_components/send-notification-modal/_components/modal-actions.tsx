"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ModalActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ModalActions({
  onSubmit,
  onCancel,
  isLoading,
}: ModalActionsProps) {
  const t = useTranslations("NotificationPage.sendModal");

  return (
    <div className="flex gap-3 pt-1">
      <Button
        className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {t("send")}
      </Button>
      <Button
        variant="outline"
        className="flex-1 rounded-xl"
        onClick={onCancel}
        disabled={isLoading}
      >
        {t("cancel")}
      </Button>
    </div>
  );
}
