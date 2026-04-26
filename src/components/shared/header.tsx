import { Bell, LogOut } from "lucide-react";
import SearchInput from "./search-input";
import LanguageSwitcher from "./language-switcher";
import LogoutButton from "./logout-button";
import { NotificationBell } from "../common/notification-bell";

export default function Header() {
  return (
    <header className="h-[74.5px] flex justify-between items-center px-6 border-b-[0.8px] border-[#E5E7EB] bg-white">
      <div className="w-lg"></div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <NotificationBell /> {/* ← أضف */}
        <LogoutButton />
      </div>
    </header>
  );
}
