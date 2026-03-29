"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { TermsPolicy, TermsTarget } from "../_types/terms.types";
import TermsCategorySelect from "./terms-category-select";
import TermsVersionInfo from "./terms-version-info";
import TermsAlert from "./terms-alert";
import TermsEditor from "./terms-editor";
import { Button } from "@/components/ui/button";

interface TermsFormProps {
  policies: TermsPolicy[];
}

export default function TermsForm({ policies }: TermsFormProps) {
  const t = useTranslations("termsPage.form");
  const locale = useLocale();
  const [activeTarget, setActiveTarget] = useState<TermsTarget>("customer");
  const [contentAr, setContentAr] = useState<Record<TermsTarget, string>>({
    customer: policies.find((p) => p.target === "customer")?.content_ar ?? "",
    driver: policies.find((p) => p.target === "driver")?.content_ar ?? "",
  });
  const [contentEn, setContentEn] = useState<Record<TermsTarget, string>>({
    customer: policies.find((p) => p.target === "customer")?.content_en ?? "",
    driver: policies.find((p) => p.target === "driver")?.content_en ?? "",
  });

  const activePolicy = policies.find((p) => p.target === activeTarget);
  const isAr = locale === "ar";

  const currentContent = isAr
    ? contentAr[activeTarget]
    : contentEn[activeTarget];

  const handleContentChange = (value: string) => {
    if (isAr) {
      setContentAr((prev) => ({ ...prev, [activeTarget]: value }));
    } else {
      setContentEn((prev) => ({ ...prev, [activeTarget]: value }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Right - Sidebar */}
      <div className="space-y-4">
        <TermsCategorySelect
          activeTarget={activeTarget}
          onChange={setActiveTarget}
        />
        <TermsVersionInfo policy={activePolicy} />
        <div className="space-y-2">
          <Button className="w-full h-12 bg-[#155DFC] hover:bg-[#193CB8] text-white font-medium">
            ✓ {t("publish")}
          </Button>
          <Button variant="outline" className="w-full h-12 font-medium border-gray-300">
            {t("saveDraft")}
          </Button>
        </div>
      </div>

      {/* Left - Editor */}
      <div className="lg:col-span-2 space-y-4">
        <TermsEditor
          key={`${activeTarget}-${locale}`}
          content={currentContent}
          onChange={handleContentChange}
        />
        <TermsAlert />
      </div>
    </div>
  );
}
