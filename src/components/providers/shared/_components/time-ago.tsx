"use client";

import { useLocale } from "next-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import "dayjs/locale/en";

dayjs.extend(relativeTime);

export default function TimeAgo({ time }: { time: string }) {
  const locale = useLocale(); // "ar" أو "en"

  dayjs.locale(locale);

  const orderTime = dayjs(time);
  const now = dayjs();

  if (now.diff(orderTime, "hour") >= 24) {
    return <span>{orderTime.format("DD/MM/YYYY")}</span>;
  }

  return <span>{orderTime.fromNow()}</span>;
}
