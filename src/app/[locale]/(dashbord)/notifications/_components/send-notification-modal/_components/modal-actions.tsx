"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ModalActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

export default function ModalActions({
  onSubmit,
  onCancel,
  isPending,
}: ModalActionsProps) {
  const t = useTranslations("NotificationPage.sendModal");

  return (
    <div className="flex gap-3 pt-1">
      <Button
        className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
        onClick={onSubmit}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t("send")}
      </Button>
      <Button
        variant="outline"
        className="flex-1 rounded-xl"
        onClick={onCancel}
        disabled={isPending}
      >
        {t("cancel")}
      </Button>
    </div>
  );
}
