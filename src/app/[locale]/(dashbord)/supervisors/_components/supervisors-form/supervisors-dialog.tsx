"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

import { ApiSupervisor } from "@/src/lib/types/admin/admin";
import SupervisorsForm from "./supervisors-form";

interface Props {
  open: boolean;
  onClose: () => void;
  supervisor?: ApiSupervisor;
}

export default function SupervisorsDialog({
  open,
  onClose,
  supervisor,
}: Props) {
  const t = useTranslations("supervisorsPage.form");
  const isEdit = !!supervisor;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-2xl p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-[#101828]">
            {isEdit ? t("editTitle") : t("addTitle")}
          </DialogTitle>
        </DialogHeader>
        <SupervisorsForm supervisor={supervisor} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
