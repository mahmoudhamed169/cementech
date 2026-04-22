"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShieldX } from "lucide-react";
import { PermissionKey } from "@/src/lib/types/permissions";

const ORDERED_ROUTES: { path: string; resource: PermissionKey }[] = [
  { path: "/", resource: "home_permission" },
  { path: "/orders", resource: "order_permission" },
  { path: "/drivers", resource: "driver_permission" },
  { path: "/loadingRequests", resource: "loading_request_permission" },
  { path: "/users", resource: "user_permission" },
  { path: "/payments", resource: "payment_permission" },
  { path: "/invoices", resource: "invoice_permission" },
  { path: "/supervisors", resource: "supervisor_permission" },
  { path: "/suppliers", resource: "supplier_permission" },
  { path: "/settings", resource: "setting_permission" },
  { path: "/terms", resource: "terms_permission" },
];

export default function ForbiddenPage() {
  const t = useTranslations("forbiddenPage");
  const router = useRouter();
  const locale = useLocale();
  const { data: session } = useSession();

  const handleGoHome = () => {
    const permissions = session?.user?.permissions;

    if (!permissions) {
      router.push(`/${locale}/login`);
      return;
    }

    if (permissions.is_admin) {
      router.push(`/${locale}`);
      return;
    }

    // أول صفحة عنده صلاحية عليها
    for (const route of ORDERED_ROUTES) {
      const perms = permissions[route.resource] as string[] | undefined;
      if (Array.isArray(perms) && perms.includes("GET")) {
        const path = route.path === "/" ? "" : route.path;
        router.push(`/${locale}${path}`);
        return;
      }
    }

    // مفيش أي صلاحية
    router.push(`/${locale}/login`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-red-400" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#F9FAFB]" />
        </div>

        {/* 403 */}
        <div
          className="text-[7rem] font-black leading-none mb-4 select-none"
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #991b1b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          403
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-[#101828] mb-3">{t("title")}</h1>
        <p className="text-[#6A7282] text-base leading-relaxed mb-10">
          {t("description")}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl border border-[#E5E7EB] text-[#4A5565] hover:text-[#101828] hover:border-[#D1D5DB] text-sm font-medium transition-all duration-200"
          >
            {t("back")}
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-2.5 rounded-xl bg-[#1E2939] hover:bg-[#2d3f55] text-white text-sm font-semibold transition-all duration-200"
          >
            {t("home")}
          </button>
        </div>
      </div>
    </div>
  );
}
