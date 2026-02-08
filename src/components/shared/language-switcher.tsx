"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (nextLocale: "ar" | "en") => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-sm">
      {/* Arabic */}
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition
          ${
            locale === "ar"
              ? "bg-[#155DFC] text-white shadow"
              : "text-[#4A5565] hover:bg-gray-100"
          }`}
      >
        العربية
      </button>

      {/* English */}
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition
          ${
            locale === "en"
              ? "bg-[#155DFC] text-white shadow"
              : "text-[#4A5565] hover:bg-gray-100"
          }`}
      >
        English
      </button>
    </div>
  );
}
