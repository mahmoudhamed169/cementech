"use client";

import { useState } from "react";
import { Notification, NotificationSeverity } from "../_types/notification";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

// ─── severity config ──────────────────────────────────────────────────────────
type SeverityConfig = {
  icon: React.ElementType;
  iconClass: string;
  borderClass: string;
  bgClass: string;
};

const severityConfig: Record<NotificationSeverity, SeverityConfig> = {
  error:   { icon: AlertCircle,   iconClass: "text-red-500",    borderClass: "border-red-200",    bgClass: "bg-red-50"    },
  warning: { icon: AlertTriangle, iconClass: "text-orange-400", borderClass: "border-orange-200", bgClass: "bg-orange-50" },
  info:    { icon: Info,          iconClass: "text-blue-400",   borderClass: "border-blue-200",   bgClass: "bg-blue-50"   },
  success: { icon: CheckCircle2,  iconClass: "text-green-500",  borderClass: "border-green-200",  bgClass: "bg-green-50"  },
};
// ─── props ────────────────────────────────────────────────────────────────────
interface NotificationCardProps {
  notification: Notification;
}

// ─── component ────────────────────────────────────────────────────────────────
export default function NotificationCard({ notification: initialNotification }: NotificationCardProps) {
  const [notification, setNotification] = useState(initialNotification);

  const { icon: Icon, iconClass, borderClass, bgClass } = severityConfig[notification.severity];

  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
    locale: ar,
  });

  // ─── handler ────────────────────────────────────────────────────────────────
  function handleAction(actionKey: string) {
    switch (actionKey) {
      case "mark_read":
        setNotification((prev) => ({ ...prev, read: true }));
        break;
      case "assign_now":
        console.log("assign_now for", notification.id);
        break;
      case "view_driver":
        console.log("view_driver for", notification.id);
        break;
      case "review_join":
        console.log("review_join for", notification.id);
        break;
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 space-y-3 transition-all",
        bgClass,
        borderClass,
        !notification.read && "shadow-sm",
      )}
      dir="rtl"
    >
      {/* header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {!notification.read && (
            <span
              className="mt-1 h-2 w-2 rounded-full bg-current shrink-0"
              style={{ color: "inherit" }}
            />
          )}
          <Icon className={cn("h-5 w-5 shrink-0", iconClass)} />
          <span className="font-semibold text-gray-800 text-sm">
            {notification.title}
          </span>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
          {timeAgo}
        </span>
      </div>

      {/* description */}
      <p className="text-sm text-gray-600 pr-7">{notification.description}</p>

      {/* actions */}
      {notification.actions && notification.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pr-7">
          {notification.actions.map((action) => (
            <Button
              key={action.label}
              size="sm"
              variant={action.variant === "ghost" ? "ghost" : "outline"}
              className={cn(
                "rounded-xl text-xs h-8 px-3",
                action.variant !== "ghost" &&
                  "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => action.onClick && handleAction(action.onClick)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}