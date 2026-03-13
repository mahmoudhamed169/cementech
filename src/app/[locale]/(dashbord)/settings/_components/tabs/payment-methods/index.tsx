"use client";

import { useState } from "react";
import {
  CreditCard,
  Truck,
  Smartphone,
  Banknote,
  Landmark,
} from "lucide-react";
import PaymentMethodRow from "./payment-method-row";
import { useTranslations } from "next-intl";

type PaymentMethod = {
  id: string;
  labelKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  enabled: boolean;
};

const defaultMethods: PaymentMethod[] = [
  { id: "cod", labelKey: "cod", icon: Truck, enabled: true },
  { id: "credit", labelKey: "credit", icon: CreditCard, enabled: true },
  { id: "apple", labelKey: "apple", icon: Smartphone, enabled: true },
  { id: "tabby", labelKey: "tabby", icon: Banknote, enabled: true },
  { id: "tamara", labelKey: "tamara", icon: Landmark, enabled: true },
];

export default function PaymentMethodsTab() {
  const t = useTranslations("settingsPage.tabs.payment");
  const [methods, setMethods] = useState<PaymentMethod[]>(defaultMethods);

  const handleToggle = (id: string, value: boolean) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: value } : m)),
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-end">
        <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="space-y-2">
        {methods.map((method) => (
          <PaymentMethodRow
            key={method.id}
            label={t(`methods.${method.labelKey}`)}
            icon={method.icon}
            enabled={method.enabled}
            onToggle={(val) => handleToggle(method.id, val)}
          />
        ))}
      </div>
    </div>
  );
}
