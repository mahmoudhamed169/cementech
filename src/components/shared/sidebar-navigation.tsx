"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SidebarLinkItem from "./sidebar-item";
import { usePermissionsStore } from "@/src/store/permissionsStore";
import { PermissionKey } from "@/src/lib/types/permissions";
import {
  Bell,
  CarFront,
  CircleDollarSign,
  Factory,
  FileText,
  Key,
  LayoutDashboard,
  ReceiptText,
  ScrollText,
  Settings,
  ShoppingBag,
  Users,
  UserCog,
} from "lucide-react";

const SidebarLinks: {
  href: string;
  labelKey: string;
  icon: React.ReactNode;
  permissionKey: PermissionKey | null;
}[] = [
  {
    href: "/",
    labelKey: "home",
    icon: <LayoutDashboard size={24} strokeWidth={1.75} />,
    permissionKey: "home_permission",
  },
  {
    href: "/orders",
    labelKey: "orders",
    icon: <ShoppingBag size={24} strokeWidth={1.75} />,
    permissionKey: "order_permission",
  },
  {
    href: "/drivers",
    labelKey: "drivers",
    icon: <CarFront size={24} strokeWidth={1.75} />,
    permissionKey: "driver_permission",
  },
  {
    href: "/loadingRequests",
    labelKey: "loadingRequests",
    icon: <ScrollText size={24} strokeWidth={1.75} />,
    permissionKey: "loading_request_permission",
  },
  {
    href: "/users",
    labelKey: "users",
    icon: <Users size={24} strokeWidth={1.75} />,
    permissionKey: "user_permission",
  },
  {
    href: "/payments",
    labelKey: "payments",
    icon: <CircleDollarSign size={24} strokeWidth={1.75} />,
    permissionKey: "payment_permission",
  },
  {
    href: "/invoices",
    labelKey: "invoices",
    icon: <ReceiptText size={24} strokeWidth={1.75} />,
    permissionKey: "invoice_permission",
  },
  {
    href: "/notifications",
    labelKey: "notifications",
    icon: <Bell size={24} strokeWidth={1.75} />,
    permissionKey: "notification_permission",
  },
  {
    href: "/permissions",
    labelKey: "permissions",
    icon: <Key size={24} strokeWidth={1.75} />,
    permissionKey: "management_permission",
  },
  {
    href: "/supervisors",
    labelKey: "supervisors",
    icon: <UserCog size={24} strokeWidth={1.75} />,
    permissionKey: "supervisor_permission",
  },
  {
    href: "/suppliers",
    labelKey: "suppliers",
    icon: <Factory size={24} strokeWidth={1.75} />,
    permissionKey: "supplier_permission",
  },
  {
    href: "/terms",
    labelKey: "terms",
    icon: <FileText size={24} strokeWidth={1.75} />,
    permissionKey: "terms_permission",
  },
  {
    href: "/settings",
    labelKey: "settings",
    icon: <Settings size={24} strokeWidth={1.75} />,
    permissionKey: "setting_permission",
  },
];

export default function SideBarNavigation() {
  const t = useTranslations("sidebar");
  const can = usePermissionsStore((s) => s.can);
  const isAdmin = usePermissionsStore((s) => s.isAdmin);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // قبل التحميل: نعرض كل الروابط بدون فلترة لتجنب Hydration Mismatch
  const visibleLinks = mounted
    ? SidebarLinks.filter((link) => {
        if (!link.permissionKey) return true;
        if (isAdmin()) return true;
        return can(link.permissionKey, "GET");
      })
    : SidebarLinks;

  return (
    <nav
      className="px-3 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#374151 transparent" }}
    >
      <ul>
        {visibleLinks.map((link) => (
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