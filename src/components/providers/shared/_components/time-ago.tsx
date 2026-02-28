"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import "dayjs/locale/en";

dayjs.extend(relativeTime);

export default function TimeAgo({ time }: { time: string }) {
  const locale = useLocale(); // "ar" أو "en"

  // SSR + أول رندر على العميل يطلعوا نفس القيمة (تاريخ ثابت)
  const [display, setDisplay] = useState(() => {
    const orderTime = dayjs(time);
    return orderTime.format("DD/MM/YYYY");
  });

  useEffect(() => {
    dayjs.locale(locale);

    const orderTime = dayjs(time);
    const now = dayjs();

    if (now.diff(orderTime, "hour") >= 24) {
      setDisplay(orderTime.format("DD/MM/YYYY"));
    } else {
      setDisplay(orderTime.fromNow());
    }
  }, [time, locale]);

  return <span>{display}</span>;
}
