"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePushNotifications } from "@/src/hooks/usePushNotifications";

export function NotificationBell() {
  const t = useTranslations("notifications-bill");
  const { notifications, clearNotifications } = usePushNotifications();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleNotificationClick = () => {
    setOpen(false);
    router.push(`/${locale}/notifications`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <Bell
            className={cn(
              "w-5 h-5 transition-colors duration-200",
              notifications.length > 0 ? "text-primary" : "text-gray-500",
            )}
          />
          {notifications.length > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {notifications.length > 99 ? "99+" : notifications.length}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 shadow-sm rounded-xl overflow-hidden border border-gray-100"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-sm text-gray-700">
              {t("title")}
            </span>
            {notifications.length > 0 && (
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <X className="w-3 h-3" />
              {t("clearAll")}
            </button>
          )}
        </div>

        {/* Body */}
        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 bg-white">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="w-5 h-5 opacity-40" />
              </div>
              <p className="text-sm font-medium">{t("empty")}</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={handleNotificationClick} // ← هنا
                className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {n.body}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
