import { useEffect, useState } from "react";
import { getBeamsClient } from "../lib/beamsClient";


export function usePushNotifications(interests: string[]) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = getBeamsClient();
    if (!client) return;

    client
      .start()
      .then((c) => c.getDeviceId())
      .then(() =>
        Promise.all(interests.map((i) => client.addDeviceInterest(i))),
      )
      .then(() => setIsReady(true))
      .catch((err) => setError(err.message));

    return () => {
      client.stop().catch(console.error);
    };
  }, []);

  return { isReady, error };
}
