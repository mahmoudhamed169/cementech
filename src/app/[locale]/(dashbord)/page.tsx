import Welcome from "@/src/app/[locale]/(dashbord)/_components/welcome";
import { useTranslations } from "next-intl";
import Statistics from "./_components/statistics";
import Status from "./_components/status";
import RecentOrders from "./_components/recent-orders";

export default function Home() {
  return (
    <div className=" min-h-screen pt-12 pb-5 px-6 space-y-6  ">
      <Welcome />
      <Statistics />
      <Status />
      <RecentOrders />
    </div>
  );
}
