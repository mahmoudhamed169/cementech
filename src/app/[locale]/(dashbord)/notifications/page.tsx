import NotificationCard from "./_components/notification-card";
import { mockNotifications } from "./_data/mock-notifications";

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3"
      dir="rtl"
    >
      {/* header row */}
      {unreadCount > 0 && (
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-500">
            {unreadCount} إشعار غير مقروء
          </p>
        </div>
      )}

      {/* list */}
      {mockNotifications.length === 0 ? (
        <p className="text-center text-gray-400 py-16">لا توجد إشعارات</p>
      ) : (
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
