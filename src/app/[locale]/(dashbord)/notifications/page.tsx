import { cookies } from "next/headers";
import { mapApiNotification } from "@/src/lib/services/notifications/map-notification";
import { getNotifications } from "@/src/lib/services/notifications/get-notifications";
import NotificationsHeader from "./_components/notifications-header";
import NotificationsList from "./_components/notifications-list";

export default async function NotificationsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  const response = await getNotifications(lang);
  const notifications = response.data.map(mapApiNotification);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full" dir="rtl">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <NotificationsHeader unreadCount={unreadCount} />
        <NotificationsList notifications={notifications} />
      </div>
    </div>
  );
}
