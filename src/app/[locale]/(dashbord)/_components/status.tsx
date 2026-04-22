import DriversStatus from "./drivers-status";
import SystemWarnings from "./system-warnings";
import { getDriverStats } from "@/src/lib/services/get-driver-stats";
import { getNotifications } from "@/src/lib/services/notifications/get-notifications";
import { mapApiNotification } from "@/src/lib/services/notifications/map-notification";
import { cookies } from "next/headers";

export default async function Status() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value ?? "ar") as "ar" | "en";

  const [driverStats, notificationsResponse] = await Promise.all([
    getDriverStats(),
    getNotifications(lang),
  ]);

  const notifications = (notificationsResponse.data ?? [])
    .map(mapApiNotification)
    .slice(0, 4);

  return (
    // items-stretch هو السر — بيخلي الـ children كلهم نفس الـ height
    <section className="flex gap-8 items-stretch min-h-0">
      <DriversStatus data={driverStats} />
      <SystemWarnings notifications={notifications} />
    </section>
  );
}
