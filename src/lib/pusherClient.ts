import Pusher from "pusher-js";

let pusherClient: Pusher | null = null;

export function getPusherClient() {
  if (typeof window === "undefined") return null;

  if (!pusherClient) {
    Pusher.logToConsole = true; // ← أضف ده مؤقتاً
    pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
  }

  return pusherClient;
}
