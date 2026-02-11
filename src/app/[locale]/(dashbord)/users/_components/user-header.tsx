"use client";

import { useTranslations } from "next-intl";

export default function UserHeader() {
  const t = useTranslations("userPage.header");

  return (
    <div className="h-28 flex justify-between text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
      <div className="space-x-2">
        <h2 className="text-2xl font-bold">
          {t("title")}
        </h2>
        <p>
          {t("description")}
        </p>
      </div>
    </div>
  );
}
