"use client";

import { userStatistics } from "@/src/lib/constants/user-statistics";
import { useTranslations } from "next-intl";
import UserStatisticsItem from "./user-statistics-item";

export default function UsersStatistics() {
  const t = useTranslations("userPage.statistics");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {userStatistics.map((item) => (
          <UserStatisticsItem
            key={item.key}
            title={t(item.key)}
            value={item.value}
            valueColor={item.color}
          />
        ))}
      </div>
    </section>
  );
}
