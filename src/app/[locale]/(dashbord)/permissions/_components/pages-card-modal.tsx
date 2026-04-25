"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { colors } from "./role-card";
import { useTranslations } from "next-intl";

export default function PagesModal({
  title,
  pages,
  c,
}: {
  title: string;
  pages: string[];
  c: ReturnType<typeof colors>;
}) {
  const t = useTranslations("permissionsPage.pagesModal");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${c.more}`}
        >
          <ChevronLeft size={11} />
          {t("morePage", { count: pages.length - 3 })}
        </button>
      </DialogTrigger>

      <DialogContent
        className={`max-w-sm rounded-2xl ${c.card}`}
        style={{ fontFamily: "Tajawal, sans-serif" }}
      >
        <DialogHeader>
          <DialogTitle className={`text-base font-bold ${c.count}`}>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {pages.map((page, i) => (
            <span
              key={i}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium text-center ${c.tag}`}
            >
              {page}
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
