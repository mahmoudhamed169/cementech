"use client";

import { Trash2, TriangleAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteFactory } from "../../_hooks/use-delete-factory";

interface DeleteFactoryDialogProps {
  factoryId: string;
  factoryName: string;
}

export function DeleteFactoryDialog({
  factoryId,
  factoryName,
}: DeleteFactoryDialogProps) {
  const t = useTranslations("suppliersPage.deleteFactory");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useDeleteFactory(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group p-2 rounded-xl transition-all duration-200 hover:bg-red-50">
          <Trash2
            size={18}
            className="text-[#9AA3AF] group-hover:text-red-500 transition-colors duration-200"
          />
        </button>
      </DialogTrigger>

      <DialogContent
        dir={dir}
        className="bg-white border-0 shadow-2xl rounded-3xl max-w-md p-0 overflow-hidden"
      >
        {/* Body */}
        <div className="flex flex-col items-center px-12 pt-14 pb-10 text-center">
          {/* Layered icon */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-red-50" />
            <div className="absolute w-24 h-24 rounded-full bg-red-100" />
            <div className="absolute w-14 h-14 rounded-full bg-red-200/70 flex items-center justify-center">
              <TriangleAlert
                size={28}
                className="text-red-600"
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#101828] mb-3 leading-snug tracking-tight">
            {t("title")}
          </h2>

          {/* Description */}
          <p className="text-base text-[#6B7280] leading-relaxed max-w-xs">
            {t("description")}{" "}
            <span className="font-semibold text-[#101828]">
              "{factoryName}"
            </span>
            {t("descriptionSuffix")}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F3F4F6]" />

        {/* Buttons */}
        <div className="grid grid-cols-2 divide-x divide-[#F3F4F6]">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="py-5 text-base font-semibold text-[#6B7280] bg-white hover:bg-[#F9FAFB] transition-colors duration-150 disabled:opacity-50 rounded-bl-3xl"
          >
            {t("buttons.cancel")}
          </button>
          <button
            type="button"
            onClick={() => mutate(factoryId)}
            disabled={isPending}
            className="py-5 text-base font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-150 disabled:opacity-60 rounded-br-3xl"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {t("buttons.deleting")}
              </span>
            ) : (
              t("buttons.confirm")
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
