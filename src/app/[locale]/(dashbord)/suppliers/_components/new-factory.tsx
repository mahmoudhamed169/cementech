"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { AddFactoryForm, type AddFactoryFormValues  } from "./add-factory-form";
import { addFactoryAction } from "../_actions/factory.actions";

export function AddNewFactory() {
  const t = useTranslations("suppliersPage");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddFactoryFormValues) => addFactoryAction(data),
    onSuccess: () => {
      toast.success(t("addFactory.messages.success"));
      queryClient.invalidateQueries({ queryKey: ["factories"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(t("addFactory.messages.error"));
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center gap-2">
          <CirclePlus />
          {t("header.btn")}
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[1008px] bg-white border-0" dir={dir}>
        <DialogHeader>
          <DialogTitle className="py-4 border-b border-[#E5E7EB] font-bold text-xl">
            {t("addFactory.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-1">
            {t("addFactory.sectionTitle")}
          </h3>
          <AddFactoryForm
            onSubmit={(values) => mutate(values)}
            onCancel={() => setOpen(false)}
            isPending={isPending}
            dir={dir}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
