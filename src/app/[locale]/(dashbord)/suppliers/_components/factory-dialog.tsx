"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import FactoryDataForm from "./factory-data-form";
import { FactoryDataFormValues } from "../_schema/factory.schema";
import { useAddFactory } from "../_hooks/use-add-factory";
import { useEditFactory } from "../_hooks/use-edit-factory";

interface FactoryDialogProps {
  mode?: "add" | "edit";
  factoryId?: string;
  defaultValues?: Partial<FactoryDataFormValues>;
  trigger?: React.ReactNode;
  
}

export default function FactoryDialog({
  mode = "add",
  factoryId,
  defaultValues,
  trigger,
}: FactoryDialogProps) {
  const t = useTranslations("suppliersPage");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const addMutation = useAddFactory(closeDialog);
  const editMutation = useEditFactory(factoryId ?? "", closeDialog);

  const { mutate, isPending } = mode === "edit" ? editMutation : addMutation;

  const defaultTrigger =
    mode === "add" ? (
      <Button className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center gap-2">
        <CirclePlus />
        {t("header.btn")}
      </Button>
    ) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>

      <DialogContent
        className="min-w-[1008px] bg-white border-0 max-h-[90vh] overflow-y-auto"
        dir={dir}
      >
        <DialogHeader>
          <DialogTitle className="py-4 border-b border-[#E5E7EB] font-bold text-xl">
            {mode === "add" ? t("addFactory.title") : t("editFactory.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-1">
            {t("addFactory.sectionTitle")}
          </h3>
          <FactoryDataForm
            key={open ? "open" : "closed"}
            onSubmit={(values) => mutate(values)}
            onCancel={closeDialog}
            isPending={isPending}
            dir={dir}
            mode={mode}
            defaultValues={defaultValues}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
