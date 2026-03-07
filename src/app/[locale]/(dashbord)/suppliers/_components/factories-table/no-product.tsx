import React from "react";
import { useTranslations } from "next-intl";

export default function NpProducts() {
  const t = useTranslations("suppliersPage");

  return (
    <div className="h-40 bg-[#F5F5F5] rounded-xl flex justify-center items-center">
      <h5 className="text-[#969696] font-bold">
        {t("addFactory.productsManagement.empty")}
      </h5>
    </div>
  );
}
