"use client";

import { usePushNotifications } from "@/src/hooks/usePushNotifications";


export function PushNotificationInit({ interests }: { interests: string[] }) {
  const { isReady, error } = usePushNotifications(interests);

  if (error) console.error("Push error:", error);
  if (isReady) console.log("✅ Listening for notifications...");

  return null;
}
