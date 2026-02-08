"use client";

import { useTranslations } from "next-intl";

export default function Welcome() {
  const t = useTranslations("welcome");

  return (
    <div className="h-28 flex flex-col text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
      <h4 className="text-xl font-bold">
        {t("title", { name: "محمد" })}
      </h4>
      <p>{t("subtitle")}</p>
    </div>
  );
}
