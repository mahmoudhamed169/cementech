"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMarkAllAsRead } from "../_hooks/use-mark-all-as-read";

interface NotificationsHeaderProps {
  unreadCount: number;
}

export default function NotificationsHeader({
  unreadCount,
}: NotificationsHeaderProps) {
  const t = useTranslations("NotificationPage");
  const { mutate: markAll, isPending } = useMarkAllAsRead();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-gray-500" />
        <h2 className="text-base font-semibold text-gray-800">{t("title")}</h2>
      </div>

      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <>
            <span className="text-xs font-medium bg-red-50 text-red-600 border border-red-100 rounded-full px-2.5 py-0.5">
              {unreadCount} {t("unreadCount")}
            </span>
            <button
              onClick={() => markAll()}
              disabled={isPending}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 border border-blue-100 bg-blue-50 hover:bg-blue-100 rounded-full px-2.5 py-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "..." : t("markAllAsRead.button")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
