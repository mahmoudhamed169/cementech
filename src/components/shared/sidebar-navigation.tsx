import { Link } from "@/src/i18n/navigation";
import {
  CarFront,
  CircleDollarSign,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import SidebarLinkItem from "./sidebar-item";

const SidebarLinks = [
  {
    href: "/",
    label: "الصفحة الرئيسية",
    icon: <LayoutDashboard size={24} strokeWidth={1.75} />,
  },
  {
    href: "/orders",
    label: "الطلبات",
    icon: <ShoppingBag size={24} strokeWidth={1.75} />,
  },

  {
    href: "/drivers",
    label: "السائقين",
    icon: <CarFront size={24} strokeWidth={1.75} />,
  },
  {
    href: "/users",
    label: "المستخدمين",
    icon: <Users size={24} strokeWidth={1.75} />,
  },
  {
    href: "/payments",
    label: "المدفوعات",
    icon: <CircleDollarSign size={24} strokeWidth={1.75} />,
  },
  {
    href: "/settings",
    label: "الاعدادات",
    icon: <Settings size={24} strokeWidth={1.75} />,
  },
];

export default function SideBarNavigation() {
  return (
    <nav className="py-4 px-3">
      <ul>
        {SidebarLinks.map((link) => (
          <SidebarLinkItem
            key={link.href}
            href={link.href}
            label={link.label}
            Icon={link.icon}
          />
        ))}
      </ul>
    </nav>
  );
}

