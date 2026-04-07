"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useMarkAsRead } from "../_hooks/use-mark-as-read";
import { useDeleteNotification } from "../_hooks/use-delete-notification";
import { useTranslations } from "next-intl";

type NotificationSeverity = "success" | "error" | "alert";

type NotificationAction = {
  label: string;
  variant: "outline" | "ghost";
  onClick: string;
};

type Notification = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: string;
  severity: NotificationSeverity;
  actions?: NotificationAction[];
};

type SeverityConfig = {
  bg: string;
  border: string;
  titleColor: string;
  badgeBg: string;
  badgeText: string;
  color: string;
};

const severityConfig: Record<NotificationSeverity, SeverityConfig> = {
  error: {
    bg: "bg-red-50",
    border: "border-red-100",
    titleColor: "text-red-700",
    badgeBg: "bg-red-100",
    badgeText: "text-red-600",
    color: "#ef4444",
  },
  alert: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    titleColor: "text-blue-800",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-600",
    color: "#3b82f6",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-100",
    titleColor: "text-green-800",
    badgeBg: "bg-green-100",
    badgeText: "text-green-600",
    color: "#22c55e",
  },
};

const severityIcon: Record<NotificationSeverity, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  alert: AlertTriangle,
};

export default function NotificationCard({
  notification: init,
}: {
  notification: Notification;
}) {
  const [n, setN] = useState(init);
  const t = useTranslations("NotificationPage");
  const { mutate: markAsRead, isPending } = useMarkAsRead();
  const { mutate: deleteNotification, isPending: isDeleting } =
    useDeleteNotification();

  const cfg = severityConfig[n.severity] ?? severityConfig["alert"];
  const Icon = severityIcon[n.severity] ?? severityIcon["alert"];

  const formattedTime = format(new Date(n.timestamp), "yyyy/MM/dd · HH:mm", {
    locale: ar,
  });

  function handleMarkAsRead() {
    markAsRead(n.id, {
      onSuccess: () => setN((prev) => ({ ...prev, read: true })),
    });
  }

  const mainActions = n.actions?.filter((a) => a.onClick !== "mark_read") ?? [];

  return (
    <div
   
      style={{
        borderRightWidth: "4px",
        borderRightColor: n.read ? cfg.color + "bb" : cfg.color,
        backgroundColor: n.read ? cfg.color + "18" : undefined,
      }}
      className={cn(
        "w-full rounded-lg border px-4 py-3 transition-all duration-300",
        n.read ? "border-gray-100" : cn(cfg.bg, cfg.border),
      )}
    >
      <div className="flex items-start justify-between gap-2.5 ">
        {/* Right: icon + delete */}
        <div
          className={cn(
            "flex flex-col items-center shrink-0",
            n.read ? "gap-2" : "gap-8",
          )}
        >
          <Icon
            size={18}
            style={{ color: n.read ? cfg.color + "dd" : cfg.color }}
            className="transition-colors duration-300"
          />
          <button
            onClick={() => deleteNotification(n.id)}
            disabled={isDeleting}
            className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 border border-red-100 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <span className="text-[10px]">...</span>
            ) : (
              <Trash2 size={13} />
            )}
          </button>
        </div>

        {/* Middle: content */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {/* Title + badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-base leading-snug transition-all duration-300",
                n.read
                  ? "font-semibold text-gray-600"
                  : cn("font-bold", cfg.titleColor),
              )}
            >
              {n.title}
            </span>
            {!n.read && (
              <span
                className={cn(
                  "shrink-0 inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                  cfg.badgeBg,
                  cfg.badgeText,
                )}
              >
                <span
                  style={{ backgroundColor: cfg.color }}
                  className="w-1.5 h-1.5 rounded-full"
                />
                {t("badge.new")}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-gray-500">
            {n.description}
          </p>

          {/* Actions — unread only */}
          {!n.read && (
            <div className="flex items-center gap-2 flex-wrap mt-1">
              {/* {mainActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => action.onClick && handleMarkAsRead()}
                  disabled={isPending}
                  className="text-xs px-3 py-1 rounded-md border bg-white font-medium text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {action.label}
                </button>
              ))} */}
              <button
                onClick={handleMarkAsRead}
                disabled={isPending}
                className="text-xs px-3 py-1 rounded-md border bg-white font-medium text-gray-400 border-gray-200 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "..." : t("markAsRead.button")}
              </button>
            </div>
          )}
        </div>

        {/* Left: timestamp */}
        <span className="text-[11px] text-gray-400 whitespace-nowrap font-mono shrink-0 mt-0.5">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
