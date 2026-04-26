import * as PusherPushNotifications from "@pusher/push-notifications-web";

let beamsClient: PusherPushNotifications.Client | null = null;

export function getBeamsClient() {
  if (typeof window === "undefined") return null;

  if (!beamsClient) {
    beamsClient = new PusherPushNotifications.Client({
      instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID!,
    });
  }

  return beamsClient;
}
