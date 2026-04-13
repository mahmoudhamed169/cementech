"use client";

import { useTranslations } from "next-intl";
import { Notification } from "../notifications/_types/notification";
import NotificationCard from "../notifications/_components/notification-card";
import { Link } from "@/src/i18n/navigation";

interface Props {
  notifications?: Notification[];
}

function severityToWarningType(
  severity: string,
): "urgent" | "warning" | "info" {
  switch (severity) {
    case "error":
      return "urgent";
    case "alert":
      return "warning";
    default:
      return "info";
  }
}

export default function SystemWarnings({ notifications = [] }: Props) {
  const t = useTranslations("systemWarnings");

  return (
    <div className="min-h-85 bg-white flex-1 border border-[#E5E7EB] rounded-xl px-6 pt-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{t("title")}</h3>
        <Link
          href="/notifications"
          className="text-sm text-[#155DFC] hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))}

        {notifications.length === 0 && (
          <p className="text-sm text-[#6A7282] text-center py-8">
            {t("empty")}
          </p>
        )}
      </div>
    </div>
  );
}
