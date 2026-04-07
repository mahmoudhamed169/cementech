import { useTranslations } from "next-intl";
import { Bell } from "lucide-react";
import NotificationCard from "./notification-card";
import { Notification } from "../_types/notification";

interface NotificationsListProps {
  notifications: Notification[];
}

export default function NotificationsList({
  notifications,
}: NotificationsListProps) {
  const t = useTranslations("NotificationPage");

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-300">
        <Bell className="h-10 w-10" />
        <p className="text-sm">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {unread.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}

      {unread.length > 0 && read.length > 0 && (
        <div className="flex items-center gap-3 py-3">
          <div className="flex-1 border-t border-gray-100" />
          <span className="text-[11px] text-gray-300">
            {t("readSeparator")}
          </span>
          <div className="flex-1 border-t border-gray-100" />
        </div>
      )}

      {read.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
}
