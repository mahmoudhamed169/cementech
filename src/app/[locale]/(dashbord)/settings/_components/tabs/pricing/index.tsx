"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import PricingField from "./pricing-field";
import SaveButton from "./save-button";

export default function PricingTab() {
  const t = useTranslations("settingsPage.tabs.pricing");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [values, setValues] = useState({
    pricePerKm: 3.0,
    commission: 30,
    cancellationFee: 3.0,
  });

  const handleChange = (key: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    console.log("saved:", values);
  };

  const row1 = [
    <PricingField
      key="pricePerKm"
      label={t("fields.pricePerKm")}
      unit="₾"
      value={values.pricePerKm}
      onChange={(v) => handleChange("pricePerKm", v)}
    />,
    <PricingField
      key="commission"
      label={t("fields.commission")}
      unit="%"
      value={values.commission}
      onChange={(v) => handleChange("commission", v)}
    />,
  ];

  return (
    <div className="space-y-6" >
      <div>
        <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {isRTL ? [...row1].reverse() : row1}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <PricingField
          label={t("fields.cancellationFee")}
          unit="₾"
          value={values.cancellationFee}
          onChange={(v) => handleChange("cancellationFee", v)}
        />
      </div>

      <div className="flex justify-end">
        <SaveButton label={t("save")} onClick={handleSave} />
      </div>
    </div>
  );
}
