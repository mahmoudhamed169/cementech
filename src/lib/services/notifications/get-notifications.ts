// src/lib/services/notifications/get-notifications.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NotificationsResponse } from "../../types/notifications/notification";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNotifications(
  lang: "ar" | "en",
): Promise<NotificationsResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "notification_permission",
      lang,
    },
    next: { tags: ["notifications"] },
  });

  if (!res.ok) throw new Error("Failed to fetch notifications");

  return res.json() as Promise<NotificationsResponse>;
}
