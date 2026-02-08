"use client";

import { Link, usePathname } from "@/src/i18n/navigation";

export default function SidebarLinkItem({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  console.log({
    pathname,
    href,
    isActive,
  });

  return (
    <li className="mb-2">
      <Link
        href={href}
        className={`rounded-md p-4 w-58 flex items-center gap-3 transition
          ${
            isActive
              ? "bg-[#155DFC] text-white"
              : "hover:bg-[#0f48c7] text-gray-300"
          }
        `}
      >
        {Icon}
        <h6>{label}</h6>
      </Link>
    </li>
  );
}
