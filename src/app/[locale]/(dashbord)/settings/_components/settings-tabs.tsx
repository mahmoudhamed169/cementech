"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, MapPin, DollarSign } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import PaymentMethodsTab from "./tabs/payment-methods";
import DeliveryLocationsTab from "./tabs/delivery-locations";
import PricingTab from "./tabs/pricing";

export default function SettingsTabs() {
  const t = useTranslations("settingsPage.tabs");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeTab, setActiveTab] = useState("payment");

  const tabs = [
    {
      value: "payment",
      label: t("payment.trigger"),
      icon: CreditCard,
      content: <PaymentMethodsTab />,
    },
    {
      value: "delivery",
      label: t("delivery.trigger"),
      icon: MapPin,
      content: <DeliveryLocationsTab />,
    },
    {
      value: "pricing",
      label: t("pricing.trigger"),
      icon: DollarSign,
      content: <PricingTab />,
    },
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <TabsList className="bg-white border border-gray-200 rounded-xl px-2 py-7 min-h-auto gap-1">
        {tabs.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex items-center gap-2 px-5 py-6 rounded-lg text-sm font-medium text-gray-500 
                       data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                       data-[state=active]:shadow-sm transition-all"
          >
            <Icon size={15} />
            <span>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(({ value, content }) => (
        <TabsContent
          key={value}
          value={value}
          className="mt-4 bg-white border border-gray-200 rounded-2xl p-6"
        >
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
