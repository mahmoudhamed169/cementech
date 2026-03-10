"use client";
import { useTranslations } from "next-intl";
import SidebarLinkItem from "./sidebar-item";
import {
  CarFront,
  CircleDollarSign,
  Factory,
  Key,
  LayoutDashboard,
  ReceiptText,
  ScrollText,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

const SidebarLinks = [
  {
    href: "/",
    labelKey: "home",
    icon: <LayoutDashboard size={24} strokeWidth={1.75} />,
  },
  {
    href: "/orders",
    labelKey: "orders",
    icon: <ShoppingBag size={24} strokeWidth={1.75} />,
  },
  {
    href: "/drivers",
    labelKey: "drivers",
    icon: <CarFront size={24} strokeWidth={1.75} />,
  },
  {
    href: "/loadingRequests",
    labelKey: "loadingRequests",
    icon: <ScrollText size={24} strokeWidth={1.75} />,
  },
  {
    href: "/users",
    labelKey: "users",
    icon: <Users size={24} strokeWidth={1.75} />,
  },
  {
    href: "/payments",
    labelKey: "payments",
    icon: <CircleDollarSign size={24} strokeWidth={1.75} />,
  },
  {
    href: "/invoices",
    labelKey: "invoices",
    icon: <ReceiptText size={24} strokeWidth={1.75} />,
  },
  {
    href: "/settings",
    labelKey: "settings",
    icon: <Settings size={24} strokeWidth={1.75} />,
  },
  {
    href: "/permissions",
    labelKey: "permissions",
    icon: <Key size={24} strokeWidth={1.75} />,
  },
  {
    href: "/suppliers",
    labelKey: "suppliers",
    icon: <Factory size={24} strokeWidth={1.75} />,
  },
];

export default function SideBarNavigation() {
  const t = useTranslations("sidebar");

  return (
    <nav className="py-4 px-3">
      <ul>
        {SidebarLinks.map((link) => (
          <SidebarLinkItem
            key={link.href}
            href={link.href}
            label={t(link.labelKey)}
            Icon={link.icon}
          />
        ))}
      </ul>
    </nav>
  );
}
