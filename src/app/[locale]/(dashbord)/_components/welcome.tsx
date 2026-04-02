"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

export default function Welcome() {
  const t = useTranslations("welcome");
  const { data: session } = useSession();

  return (
    <div className="h-28 flex flex-col text-white rounded-2xl p-6 bg-linear-to-r from-[#155DFC] to-[#193CB8] gap-1.5">
      <h4 className="text-xl font-bold">
        {t("title", { name: session?.user.name ?? "" })}
      </h4>
      <p>{t("subtitle")}</p>
    </div>
  );
}
