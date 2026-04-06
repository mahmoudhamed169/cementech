// notifications/page.tsx

import { cookies } from "next/headers";
import { Bell } from "lucide-react";
import { mapApiNotification } from "@/src/lib/services/notifications/map-notification";
import { getNotifications } from "@/src/lib/services/notifications/get-notifications";
import NotificationCard from "./_components/notification-card";

export default async function NotificationsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  const response = await getNotifications(lang);
  const notifications = response.data.map(mapApiNotification);

  const unread = notifications.filter((n) => !n.read);
  const read   = notifications.filter((n) =>  n.read);

  return (
    <div className="w-full" dir="rtl">
      <div className="bg-white border border-gray-200 rounded-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-500" />
            <h2 className="text-base font-semibold text-gray-800">الإشعارات</h2>
          </div>
          {unread.length > 0 && (
            <span className="text-xs font-medium bg-red-50 text-red-600 border border-red-100 rounded-full px-2.5 py-0.5">
              {unread.length} غير مقروء
            </span>
          )}
        </div>

        {/* Empty */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-300">
            <Bell className="h-10 w-10" />
            <p className="text-sm">لا توجد إشعارات</p>
          </div>
        ) : (
          <div className="space-y-2">

            {/* غير مقروء */}
            {unread.map((n) => (
              <NotificationCard key={n.id} notification={n} />
            ))}

            {/* فاصل */}
            {unread.length > 0 && read.length > 0 && (
              <div className="flex items-center gap-3 py-3">
                <div className="flex-1 border-t border-gray-100" />
                <span className="text-[11px] text-gray-300">الإشعارات المقروءة</span>
                <div className="flex-1 border-t border-gray-100" />
              </div>
            )}

            {/* مقروء */}
            {read.map((n) => (
              <NotificationCard key={n.id} notification={n} />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}