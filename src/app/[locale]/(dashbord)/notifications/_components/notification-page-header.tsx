"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import SendNotificationModal from "./send-notification-modal"; // ← الـ import

export default function NotificationPageHeader() {
  const t = useTranslations("NotificationPage.header");
  const [open, setOpen] = useState(false); // ← الـ state

  return (
    <>
      <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <p className="text-sm text-white/80">{t("description")}</p>
        </div>
        <Button
          onClick={() => setOpen(true)} // ← بس كده
          className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center hover:bg-[#00A63E]/90 hover:scale-105 transition-all"
        >
          <Send />
          {t("btn")}
        </Button>
      </div>
      <SendNotificationModal open={open} onOpenChange={setOpen} /> 
    </>
  );
}
