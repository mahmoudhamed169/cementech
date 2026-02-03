"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("");
  return (
    <div className=" bg-amber-600 ">
      <h1>{t("title")}</h1>
    </div>
  );
}
