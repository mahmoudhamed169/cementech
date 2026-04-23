"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SupervisorsDialog from "./supervisors-form/supervisors-dialog";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function SupervisorsHeader() {
  const t = useTranslations("supervisorsPage.header");
  const [open, setOpen] = useState(false);

  const can = usePermissionsStore((s) => s.can);

  return (
    <>
      <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8]">
        <div className="flex flex-col gap-1.5 justify-center">
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <p className="text-white/80 text-sm">{t("description")}</p>
        </div>
        {can("supervisor_permission", "POST") && (
          <Button
            onClick={() => setOpen(true)} // ✅
            className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center gap-2"
          >
            <CirclePlus />
            {t("addBtn")}
          </Button>
        )}
      </div>

      {/* ✅ موديل الإضافة */}
      <SupervisorsDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
