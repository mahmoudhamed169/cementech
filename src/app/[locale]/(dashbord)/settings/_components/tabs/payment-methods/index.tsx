"use client";

import { CreditCard, Loader2, AlertCircle } from "lucide-react";
import PaymentMethodRow from "./payment-method-row";
import { useTranslations } from "next-intl";
import { usePaymentMethods } from "../../../_hooks/payment/use-payment-methods";
import { useTogglePaymentMethod } from "../../../_hooks/payment/use-toggle-payment-method";

export default function PaymentMethodsTab() {
  const t = useTranslations("settingsPage.tabs.payment");
  const { data, isLoading, isError } = usePaymentMethods();
  const { mutate: toggleMethod } = useTogglePaymentMethod();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-start">
          <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <div className="rounded-xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 size={28} className="text-gray-400 animate-spin" />
          <p className="text-sm text-gray-400">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="text-start">
          <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <div className="rounded-xl border border-red-100 py-16 flex flex-col items-center justify-center gap-3">
          <AlertCircle size={28} className="text-red-400" />
          <p className="text-sm text-red-400">{t("error")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-gray-800">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        {data?.data.map((method) => (
          <PaymentMethodRow
            key={method.id}
            label={method.name}
            icon={CreditCard}
            enabled={method.is_active}
            onToggle={(val) => toggleMethod({ id: method.id, is_active: val })}
          />
        ))}
      </div>
    </div>
  );
}
