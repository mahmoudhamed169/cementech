"use client";

import { LogOut } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { defaultLocale } from "@/src/i18n/routing";
import { toast } from "sonner";

export default function LogoutButton() {
  const locale = useLocale();
  const t = useTranslations("common");
  const tToast = useTranslations("common.toast");

  async function handleLogout() {
    toast.success(tToast("logoutSuccess"));
    await signOut({ callbackUrl: `/${defaultLocale}/login` });
  }

  return (
    <button
      className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 font-ibm transition-colors hover:text-red-600"
      type="button"
      onClick={handleLogout}
    >
      <span>{t("logout")}</span>
      <LogOut size={16} className={locale === "ar" ? "scale-x-[-1]" : ""} />
    </button>
  );
}
