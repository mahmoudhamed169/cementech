"use client";

import { Link, usePathname } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

export function PaymentsNav() {
  const t = useTranslations("PaymentsPage.nav");
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: "/payments/operations", label: t("operations") },
    { href: "/payments/matching", label: t("matching") },
    { href: "/payments/reports", label: t("reports") },
  ];

  return (
    <nav
      className="flex gap-1 border-b border-gray-200"
      aria-label="أقسام المدفوعات"
    >
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`
  relative px-6 py-5 text-center text-sm font-medium whitespace-nowrap transition-colors duration-200
  after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transition-all after:duration-200
  ${
    isActive
      ? "text-blue-600 after:bg-blue-600"
      : "text-gray-500 hover:text-gray-800 after:bg-transparent hover:after:bg-gray-200"
  }
`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
