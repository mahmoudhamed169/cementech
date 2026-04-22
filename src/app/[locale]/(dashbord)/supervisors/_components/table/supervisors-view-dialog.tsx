"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import {
  ShieldCheck,
  Phone,
  Hash,
  CalendarDays,
  UserRound,
  Bell,
  PowerOff,
  Power,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { ApiSupervisor } from "@/src/lib/types/admin/admin";
import SupervisorsStatusBadge from "./supervisors-status-badge";
import { useSendNotificationForm } from "@/src/components/common/send-notification/_hooks/use-send-notification-form";
import { useSendNotification } from "@/src/components/common/send-notification/_hooks/use-send-notification";
import SendNotificationForm from "@/src/components/common/send-notification/_components/notification-form-fields";
import { useLocale as useCurrentLocale } from "next-intl";
import BlockToggleButton from "@/src/components/common/block-boggle-button";

interface Props {
  open: boolean;
  onClose: () => void;
  supervisor: ApiSupervisor;
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#F3F4F6] last:border-0">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#155DFC] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#6A7282]">{label}</p>
        <div className="text-sm font-medium text-[#101828] truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function SupervisorsViewDialog({
  open,
  onClose,
  supervisor,
}: Props) {
  const t = useTranslations("supervisorsPage.viewDialog");
  const tNotif = useTranslations("SendNotification");
  const locale = useLocale();
  const [view, setView] = useState<"details" | "notification">("details");

  const isActive = supervisor.status === "active";
  const isRtl = locale === "ar";
  const BackIcon = isRtl ? ArrowLeft : ArrowRight;

  const form = useSendNotificationForm();
  const { mutate, isPending } = useSendNotification(supervisor.id, "admin");

  const formattedDate = new Date(supervisor.created_at).toLocaleDateString(
    locale === "ar" ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  function handleClose() {
    onClose();
    setTimeout(() => {
      setView("details");
      form.reset();
    }, 300);
  }

  function handleNotifSubmit(values: Parameters<typeof mutate>[0]) {
    mutate(values, {
      onSuccess: () => {
        handleClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-0 overflow-hidden border-0">
        {/* ─── VIEW: DETAILS ─── */}
        <div
          className={`transition-all duration-300 ${
            view === "details"
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8 absolute pointer-events-none"
          }`}
        >
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="text-xl font-bold text-[#101828]">
              {t("title")}
            </DialogTitle>
          </DialogHeader>

          {/* Avatar Card */}
          <div className="mx-6 mt-4 flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-2xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#DBEAFE] text-[#155DFC] text-2xl font-bold flex-shrink-0">
              {supervisor.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#101828] text-base truncate">
                {supervisor.name}
              </p>
              <p className="text-xs text-[#6A7282] mt-0.5">{supervisor.code}</p>
              <div className="mt-2">
                <SupervisorsStatusBadge status={supervisor.status} />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mx-6 mt-3 bg-[#F9FAFB] rounded-2xl px-4">
            <InfoRow
              icon={<Phone size={16} />}
              label={t("phone")}
              value={supervisor.phone}
            />
            <InfoRow
              icon={<Hash size={16} />}
              label={t("code")}
              value={supervisor.code}
            />
            <InfoRow
              icon={<ShieldCheck size={16} />}
              label={t("permission")}
              value={
                <Badge className="bg-[#DBEAFE] text-[#193CB8] hover:bg-[#DBEAFE] rounded-md px-3 py-1 text-xs font-medium">
                  {supervisor.permissions?.name ?? "-"}
                </Badge>
              }
            />
            <InfoRow
              icon={<UserRound size={16} />}
              label={t("role")}
              value={t("roleValue")}
            />
            <InfoRow
              icon={<CalendarDays size={16} />}
              label={t("createdAt")}
              value={formattedDate}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-6 py-5">
            <Button
              type="button"
              onClick={() => setView("notification")}
              className="flex-1 h-11 bg-[#155DFC] hover:bg-[#1449CC] text-white rounded-xl font-medium flex items-center justify-center gap-2 text-sm"
            >
              <Bell size={15} />
              {t("sendNotification")}
            </Button>

            <div className="flex-1">
              <BlockToggleButton
                id={supervisor.id}
                isBlocked={supervisor.status === "blocked"}
                type="admin"
                onSuccess={handleClose}
              />
            </div>
          </div>
        </div>

        {/* ─── VIEW: NOTIFICATION ─── */}
        <div
          className={`transition-all duration-300 ${
            view === "notification"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8 absolute pointer-events-none"
          }`}
        >
          <DialogHeader className="px-6 pt-6 pb-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setView("details");
                  form.reset();
                }}
                className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6A7282] transition-colors"
              >
                <BackIcon size={18} />
              </button>
              <DialogTitle className="text-xl font-bold text-[#101828]">
                {tNotif("modal.title")}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Recipient Info */}
          <div className="mx-6 mt-4 flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#DBEAFE] text-[#155DFC] text-base font-bold flex-shrink-0">
              {supervisor.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-[#101828]">
                {supervisor.name}
              </p>
              <p className="text-xs text-[#6A7282]">{supervisor.phone}</p>
            </div>
          </div>

          {/* Notification Form */}
          <div className="px-6 mt-4">
            <SendNotificationForm form={form} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 px-6 py-5">
            <Button
              className="flex-1 h-11 rounded-xl bg-[#155DFC] hover:bg-[#1449CC] text-white transition-all"
              onClick={form.handleSubmit(handleNotifSubmit)}
              disabled={isPending}
            >
              {isPending ? tNotif("modal.sending") : tNotif("modal.send")}
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-xl border-[#E5E7EB] text-[#4A5565]"
              onClick={() => {
                setView("details");
                form.reset();
              }}
              disabled={isPending}
            >
              {tNotif("modal.cancel")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
