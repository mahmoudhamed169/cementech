"use client";
import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Guidelines() {
  const t = useTranslations("permissionsPage.guidelines");

  const guidelines = [t("rules.0"), t("rules.1"), t("rules.2")];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-white p-5 shadow-sm shadow-blue-100 animate-fade-in">
      <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(99,131,255,0.12)_0%,transparent_70%)]" />

      <div className="relative mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-100 shadow-inner">
          <ShieldAlert className="h-[18px] w-[18px] text-blue-600" />
        </div>
        <div>
          <p className="mb-0.5 text-[11px] font-medium uppercase tracking-widest text-blue-400">
            {t("badge")}
          </p>
          <h2 className="text-sm font-bold leading-tight text-blue-900">
            {t("title")}
          </h2>
        </div>
      </div>

      <div className="mb-4 h-px bg-gradient-to-l from-transparent via-blue-200 to-transparent" />

      <ul className="space-y-3">
        {guidelines.map((item, i) => (
          <li key={i} className="group flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-blue-100 text-[10px] font-bold text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-blue-800">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
