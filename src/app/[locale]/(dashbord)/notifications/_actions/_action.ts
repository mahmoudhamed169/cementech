"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function markNotificationAsReadAction(id: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/notifications/${id}/mark-as-read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "notification_permission",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to mark notification as read: ${res.status}`);
  }
  revalidateTag("notifications");
  return res.json();
}

// _action.ts
export async function markAllNotificationsAsReadAction() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/notifications/mark-all-as-read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "notification_permission",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to mark all as read: ${res.status}`);
  }
  revalidateTag("notifications");

  return res.json();
}

export async function deleteNotificationAction(id: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/notifications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete notification: ${res.status}`);
  }
  revalidateTag("notifications");

  return res.json();
}
