"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function SidebarUser() {
  const { data: session } = useSession();
  const t = useTranslations("sidebar");

  return (
    <div className="p-4 border-t border-white/10 shrink-0">
      <p className="text-sm text-white/60">{t("loggedInAs")}</p>
      <p className="font-semibold">{session?.user?.role ?? "..."}</p>
    </div>
  );
}
