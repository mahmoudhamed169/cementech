import Welcome from "@/src/app/[locale]/(dashbord)/_components/welcome";
import { useTranslations } from "next-intl";
import Statistics from "./_components/statistics";
import Status from "./_components/status";

export default function Home() {
  return (
    <div className=" h-screen pt-12 px-6 space-y-6 ">
      <Welcome />
      <Statistics />
      <Status />
    </div>
  );
}
