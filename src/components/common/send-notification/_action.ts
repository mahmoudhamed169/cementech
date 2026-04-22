"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { SendNotificationSchema } from "./_schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendNotificationAction(
  data: SendNotificationSchema & {
    user_id: string;
    targert: "customer" | "driver" | "admin";
  },
) {
  const session = await getServerSession(authOptions);

  const payload = {
    title_en: data.title_en,
    title_ar: data.title_ar,
    description_en: data.description_en,
    description_ar: data.description_ar,
    user_id: data.user_id,
    target: "specific",
  };

  // console.log("📢 Sending notification with payload:", payload);

  const res = await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "notification_permission",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(`Failed to send notification: ${res.status}`);
  }

  return res.json();
}
