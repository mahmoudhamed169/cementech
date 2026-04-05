"use client";

import { useState, useTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  TermsPolicy,
  TermsTarget,
  TermsPolicyType,
} from "../_types/terms.types";
import TermsCategorySelect from "./terms-category-select";
import TermsVersionInfo from "./terms-version-info";
import TermsAlert from "./terms-alert";
import TermsEditor from "./terms-editor";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updatePolicyAction } from "../_actions/update-policy-action";

interface TermsFormProps {
  policies: TermsPolicy[];
}

type LangTab = "ar" | "en";

// مفتاح فريد لكل مجموعة محتوى: type-target-lang
type ContentKey = `${TermsPolicyType}-${TermsTarget}-${"ar" | "en"}`;

function makeKey(
  type: TermsPolicyType,
  target: TermsTarget,
  lang: "ar" | "en",
): ContentKey {
  return `${type}-${target}-${lang}`;
}

function buildInitialContent(
  policies: TermsPolicy[],
): Record<ContentKey, string> {
  const result = {} as Record<ContentKey, string>;
  const types: TermsPolicyType[] = ["privacy_policy", "terms_conditions"];
  const targets: TermsTarget[] = ["customer", "driver"];
  const langs: ("ar" | "en")[] = ["ar", "en"];

  for (const type of types) {
    for (const target of targets) {
      const policy = policies.find(
        (p) => p.type === type && p.target === target,
      );
      for (const lang of langs) {
        result[makeKey(type, target, lang)] =
          lang === "ar"
            ? (policy?.content_ar ?? "")
            : (policy?.content_en ?? "");
      }
    }
  }
  return result;
}

const policyTypeTabs: { value: TermsPolicyType }[] = [
  { value: "terms_conditions" },
  { value: "privacy_policy" },
];

export default function TermsForm({ policies }: TermsFormProps) {
  const t = useTranslations("termsPage.form");
  const tTabs = useTranslations("termsPage.tabs");

  const [activeType, setActiveType] =
    useState<TermsPolicyType>("terms_conditions");
  const [activeTarget, setActiveTarget] = useState<TermsTarget>("customer");
  const [activeLang, setActiveLang] = useState<LangTab>("ar");
  const [isPending, startTransition] = useTransition();

  const [contents, setContents] = useState<Record<ContentKey, string>>(() =>
    buildInitialContent(policies),
  );

  // مزامنة الـ state مع الـ policies بعد revalidatePath
  useEffect(() => {
    setContents(buildInitialContent(policies));
  }, [policies]);

  const activePolicy = policies.find(
    (p) => p.type === activeType && p.target === activeTarget,
  );

  const currentKey = makeKey(activeType, activeTarget, activeLang);
  const currentContent = contents[currentKey] ?? "";

  const handleContentChange = (value: string) => {
    setContents((prev) => ({ ...prev, [currentKey]: value }));
  };

  const handleSave = (status: "published" | "draft") => {
    if (!activePolicy) return;

    startTransition(async () => {
      try {
        await updatePolicyAction(activePolicy.id, {
          type: activePolicy.type,
          target: activePolicy.target,
          title_en: activePolicy.title_en,
          title_ar: activePolicy.title_ar,
          content_ar: contents[makeKey(activeType, activeTarget, "ar")],
          content_en: contents[makeKey(activeType, activeTarget, "en")],
          version: activePolicy.version,
          status,
        });
        toast.success(
          status === "published" ? t("publishSuccess") : t("draftSuccess"),
        );
      } catch {
        toast.error(t("error"));
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Policy Type Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {policyTypeTabs.map(({ value }) => (
          <button
            key={value}
            onClick={() => setActiveType(value)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeType === value
                ? "bg-white text-[#101828] shadow-sm font-semibold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tTabs(value)}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <TermsCategorySelect
            activeTarget={activeTarget}
            onChange={setActiveTarget}
          />
          <TermsVersionInfo policy={activePolicy} />
          <div className="space-y-2">
            <Button
              className="w-full h-12 bg-[#155DFC] hover:bg-[#193CB8] text-white font-medium"
              onClick={() => handleSave("published")}
              disabled={isPending}
            >
              ✓ {t("publish")}
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 font-medium border-gray-300"
              onClick={() => handleSave("draft")}
              disabled={isPending}
            >
              {t("saveDraft")}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Lang Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
            {(["ar", "en"] as LangTab[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeLang === lang
                    ? "bg-white text-[#101828] shadow-sm font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {lang === "ar" ? "العربية" : "English"}
              </button>
            ))}
          </div>

          <TermsEditor
            key={`${activeType}-${activeTarget}-${activeLang}`}
            content={currentContent}
            onChange={handleContentChange}
            dir={activeLang === "ar" ? "rtl" : "ltr"}
          />
          <TermsAlert />
        </div>
      </div>
    </div>
  );
}
