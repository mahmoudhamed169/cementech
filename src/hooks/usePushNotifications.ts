import { useEffect, useState } from "react";

import { toast } from "sonner";
import { getPusherClient } from "../lib/pusherClient";
import { revalidateNotifications } from "../lib/actions/revalidate-notifications";

export type Notification = {
  id: string;
  title: string;
  body: string;
};

export function usePushNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe("role-admin");

    channel.bind(
      "new_notification",
      async (data: { title_ar: string; description_ar: string }) => {
        // Sound effect
        const audio = new Audio("/notification.mp3");
        audio.play();

        // باقي الكود
        const newNotif: Notification = {
          id: crypto.randomUUID(),
          title: data.title_ar,
          body: data.description_ar,
        };

        toast(data.title_ar, { description: data.description_ar });
        setNotifications((prev) => [newNotif, ...prev]);
        await revalidateNotifications();
      },
    );
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("role-admin");
    };
  }, []);

  const clearNotifications = () => setNotifications([]);

  return { notifications, clearNotifications };
}
