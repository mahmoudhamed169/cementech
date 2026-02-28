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

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li className="mb-2">
      <Link
        href={href as any}
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
