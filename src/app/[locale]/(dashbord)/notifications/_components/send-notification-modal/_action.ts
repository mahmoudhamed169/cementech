"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { SendNotificationSchema } from "./_schema";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RECIPIENT_TARGET_MAP = {
  allDrivers: "driver",
  allUsers: "customer",
  all: "all",
  allSupervisors: null, // ← مش بيبعت target
} as const;

export async function sendNotificationAction(data: SendNotificationSchema) {
  const session = await getServerSession(authOptions);

  const isAdminTarget = (data.recipient as string) === "allSupervisors";

  const payload = {
    title_ar: data.title_ar,
    title_en: data.title_en,
    description_ar: data.description_ar,
    description_en: data.description_en,
    ...(isAdminTarget
      ? { for_admin: true }
      : { target: RECIPIENT_TARGET_MAP[data.recipient] }),
  };

  const res = await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("Send notification error:", {
      status: res.status,
      body: errorBody,
    });
    throw new Error(`Failed to send notification: ${res.status}`);
  }
  revalidateTag("notifications");

  return res.json();
}
